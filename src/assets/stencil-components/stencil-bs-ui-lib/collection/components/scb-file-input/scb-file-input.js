export class ScbFileInput {
    constructor() {
        this.files = [];
        this.type = 'primary';
        this.maxFiles = 0;
        this.nodrop = false;
        this.noAuto = false;
        this.maxFileSize = 0;
    }
    componentWillLoad() {
        this.element = this.el;
        const that = this;
        this.element.uploadFiles = () => {
            that.uploadFiles();
        };
    }
    /**
     * Fire hidden input click event on Button click
     */
    openFileInput() {
        const hiddenInput = this.el.getElementsByClassName('scb-fi-hidden')[0];
        hiddenInput.click();
    }
    /**
     * Remove the file from files list and aborting all pending actions about it
     * @param {number} index - index of a file in a list
     */
    removeFile(index) {
        const files = this.element.files;
        const file = files[index];
        if (file.reading) {
            file.fileReader.abort();
        }
        if (file.uploading) {
            file.xhr.abort();
        }
        files.splice(index, 1);
        this.element.files = [];
        setTimeout(() => this.element.files = [...files]);
        console.log(this.cancelDefaultDragEnter);
        console.log(this.cancelDefaultDragOver);
        console.log(this.onDrop);
    }
    /**
     * Retry the upload action for a single file
     * @param {number} index - index of a file in a list
     */
    retryUpload(index) {
        const file = this.element.files[index];
        if (this.isLoadingAborted) {
            this.uploadFile(file);
        }
    }
    /**
     * Manually upload files
     */
    uploadFiles() {
        this.files.forEach(file => file.isRead && this.uploadFile(file));
    }
    /**
     * Check if loading of a file was aborted
     * @param {Object} file - file object
     * @returns {boolean}
     */
    isLoadingAborted(file) {
        return (Boolean)(file.uploadEnded && file.loadStatus !== 100);
    }
    cancelDefaultDragEnter(event) {
        event.preventDefault();
        return false;
    }
    cancelDefaultDragOver(event) {
        event.preventDefault();
        return false;
    }
    onDrop(e) {
        event.preventDefault();
        if (!this.nodrop) {
            const dt = e.dataTransfer;
            this.addFiles(dt.files);
        }
        return false;
    }
    /**
     * Handle the file select event
     * @param {Object} event - Files select event
     */
    onFileSelect(event) {
        this.addFiles(event.target.files);
        event.target.value = '';
    }
    /**
     * Validate, add files to files list and read them
     * @param {Array} files
     */
    addFiles(files) {
        const diff = this.maxFiles - this.element.files.length;
        if (files.length > 0 && (this.maxFiles === 0 || diff > 0)) {
            const lastSelectedFiles = this.element.files;
            const filesArray = [];
            this.element.files = [];
            for (const item of files) {
                if (this.isAcceptedFileType(item) && this.isPassedFileSize(item)) {
                    filesArray.push(item);
                }
            }
            if (this.maxFiles > 0 && filesArray.length > diff) {
                filesArray.length = diff;
            }
            filesArray.forEach((file, i) => {
                file.elemId = 'file' + i + Date.now();
            });
            setTimeout(() => this.element.files = [...lastSelectedFiles, ...filesArray]);
            filesArray.forEach(file => this.readFile(file));
        }
    }
    /**
     * Check if file is accepted type
     * @param {Object} file
     * @returns {boolean}
     */
    isAcceptedFileType(file) {
        if (!this.accept) {
            return true;
        }
        const fileName = file.name.match(/\.[^\.]*$|$/)[0];
        const template = new RegExp('^(' + this.accept.replace(/[, ]+/g, '|').replace(/\/\*/g, '/.*') + ')$', 'i');
        return template.test(file.type) || template.test(fileName);
    }
    /**
     * Check if file is accepted size
     * @param {Object} file
     * @returns {boolean}
     */
    isPassedFileSize(file) {
        return !this.maxFileSize || file.size <= this.maxFileSize;
    }
    /**
     * Change the Retry button state
     * @param {Object} file
     */
    toggleRetryBtn(file) {
        const retryBtn = this.el.querySelector('#' + file.elemId + ' .scb-fi-retry-btn');
        const isAborted = this.isLoadingAborted(file);
        if (retryBtn) {
            retryBtn.classList.toggle('d-inline-block', isAborted);
        }
    }
    /**
     * Read file after add
     * @param {Object} file
     */
    readFile(file) {
        const reader = new FileReader();
        const isRequestDataPresent = this.method && this.target && this.formDataName;
        this.changeFileUploadProgress(file, 0, 'Start reading');
        reader.onprogress = (e) => {
            const percentage = Math.round(e.loaded / e.total * 100);
            this.changeFileUploadProgress(file, percentage, 'Reading');
        };
        reader.onloadend = () => {
            this.toggleRetryBtn(file);
        };
        reader.onload = () => {
            file.reading = false;
            file.isRead = true;
            this.changeFileUploadProgress(file, 100, isRequestDataPresent ? 'Queued' : '');
            if (isRequestDataPresent && !this.noAuto) {
                this.uploadFile(file);
            }
        };
        file.reading = true;
        reader.readAsDataURL(file);
        file.fileReader = reader;
    }
    /**
     * Upload file after read or retry button click
     * @param {Object} file
     */
    uploadFile(file) {
        if (!file.uploading) {
            const request = new XMLHttpRequest;
            let stalledTimeout;
            file.xhr = request;
            request.upload.onprogress = (e) => {
                clearTimeout(stalledTimeout);
                const loaded = e.loaded;
                const total = e.total;
                const progress = Math.round(100 * (loaded / total));
                file.loaded = loaded;
                file.indeterminate = 0 >= loaded || loaded >= total;
                if (file.error) {
                    file.status = '';
                    file.indeterminate = undefined;
                }
                else if (!file.abort) {
                    if (100 > progress) {
                        stalledTimeout = setTimeout(() => {
                            this.changeFileUploadProgress(file, progress, 'Stalled');
                        }, 2000);
                    }
                    else {
                        file.uploading = false;
                    }
                    this.changeFileUploadProgress(file, progress, 'Uploading');
                    this.el.dispatchEvent(new CustomEvent('upload-progress', {
                        detail: {
                            file: file,
                            xhr: request,
                        },
                    }));
                }
            };
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    clearTimeout(stalledTimeout);
                    file.indeterminate = file.uploading = false;
                    if (file.abort) {
                        this.changeFileUploadProgress(file, file.loadStatus, 'Aborted');
                    }
                    else {
                        const uploadResponseNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-response', {
                            detail: {
                                file: file,
                                xhr: request,
                            },
                            cancelable: true,
                        }));
                        if (!uploadResponseNotCanceled) {
                            return;
                        }
                        if (request.status === 0) {
                            file.error = 'Server unavailable';
                        }
                        else if (request.status >= 500) {
                            file.error = 'Unexpected server error';
                        }
                        else if (request.status >= 400) {
                            file.error = 'Forbidden';
                        }
                        file.complete = false;
                        this.el.dispatchEvent(new CustomEvent('upload-' + (file.error ? 'error' : 'success'), {
                            detail: {
                                file: file,
                                xhr: request,
                            },
                        }));
                        const loadedPercentage = file.error ? file.loadStatus : 100;
                        const uploadStatus = file.error ? ('Error: ' + file.error) : '';
                        this.changeFileUploadProgress(file, loadedPercentage, uploadStatus);
                        file.uploadEnded = true;
                        file.uploaded = !file.error;
                    }
                }
            };
            request.upload.onloadstart = () => {
                this.el.dispatchEvent(new CustomEvent('upload-start', {
                    detail: {
                        file: file,
                        xhr: request,
                    },
                }));
            };
            request.upload.onloadend = () => {
                file.uploadEnded = true;
                this.toggleRetryBtn(file);
            };
            const uploadBeforeNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-before', {
                detail: {
                    file: file,
                    xhr: request,
                },
                cancelable: true,
            }));
            if (!uploadBeforeNotCanceled) {
                return;
            }
            const formData = new FormData;
            file.uploadTarget = this.target || '';
            file.formDataName = this.formDataName;
            this.changeFileUploadProgress(file, 0, 'Start uploading');
            formData.append(file.formDataName, file, file.name);
            request.open(this.method, file.uploadTarget, true);
            this.configureXhr(request);
            file.indeterminate = true;
            file.uploading = true;
            file.uploadEnded = false;
            file.complete = file.abort = file.error = file.held = false;
            const uploadRequestNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-request', {
                detail: {
                    file: file,
                    xhr: request,
                    formData: formData,
                },
                cancelable: true,
            }));
            if (uploadRequestNotCanceled) {
                request.send(formData);
            }
        }
    }
    /**
     * Setup the XHR Request
     * @param {Object} request - upload request
     */
    configureXhr(request) {
        let headers;
        if (typeof this.headers === 'string') {
            try {
                headers = JSON.parse(this.headers.replace(new RegExp('\'', 'g'), '\"'));
            }
            catch (error) {
                headers = undefined;
            }
        }
        for (const header in headers) {
            if (header) {
                request.setRequestHeader(header, headers[header]);
            }
        }
        if (this.timeout) {
            request.timeout = this.timeout;
        }
    }
    /**
     * Show the upload progress of a file
     * @param {Object} file
     * @param {number} loadedPercentage
     * @param {string} status
     */
    changeFileUploadProgress(file, loadedPercentage, status) {
        const prBar = this.el.querySelector('#' + file.elemId + ' .progress-bar');
        const statusBar = this.el.querySelector('#' + file.elemId + ' .scb-fi-status');
        file.loadStatus = loadedPercentage;
        file.status = status;
        if (prBar) {
            prBar.style.width = loadedPercentage + '%';
        }
        if (statusBar) {
            statusBar.innerHTML = file.status || '';
        }
    }
    /**
     * Render view based on the component data
     * @returns view of the component
     */
    render() {
        const buttonClasses = {
            'scb-fi-default-button': true,
            btn: true,
            [`btn-outline-${this.type}`]: true,
        };
        const isMultiple = this.maxFiles !== 1;
        const buttonText = isMultiple ? 'Upload Files' : 'Select File';
        const dropLabel = isMultiple ? 'Drop files here...' : 'Drop file here...';
        const label = this.nodrop ? '' : h("span", { class: "scb-fi-label" },
            h("slot", { name: "label" }),
            h("span", { class: "scb-fi-default-label" }, dropLabel));
        const buttonAttrs = {};
        const inputAttrs = {};
        if (this.maxFiles > 0 && this.maxFiles <= this.element.files.length) {
            buttonAttrs['disabled'] = 'disabled';
        }
        if (isMultiple) {
            inputAttrs['multiple'] = true;
        }
        if (this.accept) {
            inputAttrs['accept'] = this.accept;
        }
        /*
         * Using the <fieldset> tag for having an ability to disable the custom button in <slot> that can't have disabled attribute set.
         */
        return (h("div", { class: "scb-fi-wrapper" },
            h("input", Object.assign({ class: "scb-fi-hidden", type: "file", onChange: () => this.onFileSelect(event) }, inputAttrs)),
            h("fieldset", Object.assign({ class: "scb-fi-button-wrapper", onClick: () => this.openFileInput() }, buttonAttrs),
                h("slot", { name: "button" }),
                h("button", { class: buttonClasses }, buttonText)),
            label,
            this.files.map((file, i) => h("div", { class: "scb-fi-row", id: file.elemId },
                h("div", { class: "scb-fi-row-header" },
                    h("span", { class: "scb-fi-name" }, file.name),
                    h("div", { class: "scb-fi-controls" },
                        h("button", { class: {
                                'scb-fi-icon-btn': true,
                                'scb-fi-retry-btn': true,
                                'd-inline-block': this.isLoadingAborted(file),
                            }, onClick: () => this.retryUpload(i) },
                            h("span", { class: "scb-icon icon-reload" })),
                        h("button", { class: "scb-fi-icon-btn close", onClick: () => this.removeFile(i) },
                            h("span", { "aria-hidden": "true" }, "\u00D7")))),
                h("div", { class: "scb-fi-status" }, file.status),
                h("div", { class: "progress" },
                    h("div", { class: {
                            'progress-bar': true,
                            [`bg-${this.type}`]: true,
                        }, style: { width: file.loadStatus + '%' }, role: "progressbar", "aria-valuenow": "0", "aria-valuemin": "0", "aria-valuemax": "100" }))))));
    }
    static get is() { return "scb-file-input"; }
    static get properties() { return { "accept": { "type": String, "attr": "accept" }, "el": { "elementRef": true }, "element": { "state": true }, "files": { "type": "Any", "attr": "files" }, "formDataName": { "type": String, "attr": "form-data-name" }, "headers": { "type": String, "attr": "headers" }, "maxFiles": { "type": Number, "attr": "max-files" }, "maxFileSize": { "type": Number, "attr": "max-file-size" }, "method": { "type": String, "attr": "method" }, "noAuto": { "type": Boolean, "attr": "no-auto" }, "nodrop": { "type": Boolean, "attr": "nodrop" }, "target": { "type": String, "attr": "target" }, "timeout": { "type": Number, "attr": "timeout" }, "type": { "type": "Any", "attr": "type" } }; }
    static get style() { return "/**style-placeholder:scb-file-input:**/"; }
}
