/*! Built with http://stenciljs.com */
index.loadBundle('file-input-page', ['exports'], function (exports) {
    var h = window.index.h;
    var FileInputPage = /** @class */ (function () {
        function FileInputPage() {
        }
        FileInputPage.prototype.render = function () {
            return (h("div", { class: "container" }, h("h2", null, "Basic usage"), h("scb-file-input", { class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input></scb-file-input>"), h("h2", null, "Bootstrap styles"), h("scb-file-input", { type: "info", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input type=\"info\"></scb-file-input>"), h("h2", null, "Max length"), h("scb-file-input", { "max-files": "3", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input max-files=\"3\"></scb-file-input>"), h("h2", null, "No multiple"), h("scb-file-input", { "max-files": "1", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input max-files=\"1\"></scb-file-input>"), h("h2", null, "No drag and drop"), h("scb-file-input", { nodrop: true, class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input nodrop></scb-file-input>"), h("h2", null, "Upload Request Properties"), h("scb-file-input", { method: "post", target: "https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage", "form-data-name": "file", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input method=\"post\" target=\"https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage\" form-data-name=\"file\"></scb-file-input>"), h("h2", null, "Custom drop label"), h("scb-file-input", { class: "mb-0" }, h("span", { slot: "label" }, "Drop your files here")), h("code", { class: "mb-3 d-block p-3" }, h("div", null, "<scb-file-input>"), h("div", { class: "ml-2" }, "<span slot=\"label\">Drop your files here</span>"), h("div", null, "</scb-file-input>")), h("h2", null, "Custom button"), h("scb-file-input", { class: "mb-0" }, h("button", { slot: "button" }, "Select files")), h("code", { class: "mb-3 d-block p-3" }, h("div", null, "<scb-file-input>"), h("div", { class: "ml-2" }, "<button slot=\"button\">Select files</button>"), h("div", null, "</scb-file-input>")), h("h2", null, "Setting Restrictions on Files to Upload"), "accept=\"image/*\" maxFileSize=\"1000000\"", h("scb-file-input", { accept: "image/*", "max-file-size": "1000000", class: "mb-0" }, h("span", { slot: "label" }, "Drop images(up to 1 MB) here...")), h("code", { class: "mb-3 d-block p-3" }, h("div", null, "<scb-file-input accept=\"image/*\" max-file-size=\"1000000\">"), h("div", { class: "ml-2" }, "<span slot=\"label\">Drop images(up to 1 MB) here...</span>"), h("div", null, "</scb-file-input>")), h("h2", null, "Customizing the Upload Request"), h("scb-file-input", { id: "customizingRequestDemo", method: "post", target: "https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage", "form-data-name": "file", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input id=\"customizingRequestDemo\" method=\"post\" target=\"https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage\" form-data-name=\"file\"></scb-file-input>", h("br", null), h("br", null), "<script>", h("div", { class: "ml-3" }, "window.addEventListener('DOMContentLoaded', function() {", h("div", { class: "ml-3" }, "var upload = document.querySelector('scb-file-input#customizingRequestDemo');", h("br", null), h("br", null), "upload.addEventListener('upload-before', function(event) {", h("div", { class: "ml-3" }, "console.log('upload xhr before open: ', event.detail.xhr);", h("br", null), h("br", null)
            // Prevent the upload request:<br/>
            // event.preventDefault();<br/><br/>
            , "// Prevent the upload request:", h("br", null)
            // event.preventDefault();<br/><br/>
            , "// event.preventDefault();", h("br", null), h("br", null), "var file = event.detail.file;", h("br", null)
            // Custom upload request url for file<br/>
            , "// Custom upload request url for file", h("br", null), "file.uploadTarget = upload.target + '/' + file.name;", h("br", null), h("br", null)
            // Custom name in the Content-Disposition header<br/>
            , "// Custom name in the Content-Disposition header", h("br", null), "file.formDataName = 'attachment';"), "});", h("br", null), h("br", null), "upload.addEventListener('upload-request', function(event) {", h("div", { class: "ml-3" }, "console.log('upload xhr after open: ', event.detail.xhr);", h("br", null), h("br", null), "event.detail.xhr.setRequestHeader('X-File-Name', event.detail.file.name);", h("br", null), "event.detail.formData.append('documentId', 1234);"), "});", h("br", null), h("br", null), "upload.addEventListener('upload-start', function(event) {", h("div", { class: "ml-3" }, "console.log('upload xhr after send: ', event.detail.xhr);"), "});"), "});"), "</script>"), h("h2", null, "Sending Files Without Wrapping in FormData"), h("scb-file-input", { id: "rawFilesDemo", method: "post", target: "https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage", "form-data-name": "file", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input id=\"rawFilesDemo\" method=\"post\" target=\"https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage\" form-data-name=\"file\"></scb-file-input>", h("br", null), h("br", null), "<script>", h("div", { class: "ml-3" }, "window.addEventListener('DOMContentLoaded', function() {", h("div", { class: "ml-3" }, "var upload = document.querySelector('scb-file-input#rawFilesDemo');", h("br", null), h("br", null), "upload.addEventListener('upload-request', function(event) {", h("div", { class: "ml-3" }, "event.preventDefault();", h("br", null), "event.detail.xhr.send(event.detail.file);"), "});"), "});"), "</script>"), h("h2", null, "Custom Reaction on Server Response"), h("scb-file-input", { id: "responseDemo", method: "post", target: "https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage", "form-data-name": "file", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input id=\"responseDemo\" method=\"post\" target=\"https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage\" form-data-name=\"file\"></scb-file-input>", h("br", null), h("br", null), "<script>", h("div", { class: "ml-3" }, "window.addEventListener('DOMContentLoaded', function() {", h("div", { class: "ml-3" }, "var upload = document.querySelector('scb-file-input#responseDemo');", h("br", null), h("br", null), "upload.addEventListener('upload-response', function(event) {", h("div", { class: "ml-3" }, "console.log('upload xhr after server response: ', event.detail.xhr);", h("br", null), "event.detail.file.error = 'Custom server error message.';", h("br", null), h("br", null)
            // Interpret any server response as success:<br/>
            // event.detail.xhr.status = 200;
            , "// Interpret any server response as success:", h("br", null)
            // event.detail.xhr.status = 200;
            , "// event.detail.xhr.status = 200;"), "});"), "});"), "</script>"), h("h2", null, "Pre-Filling the File List in Advance"), h("scb-file-input", { id: "preFillDemo", method: "post", target: "https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage", accept: "application/pdf", "form-data-name": "file", class: "mb-0" }), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input id=\"preFillDemo\" method=\"post\" target=\"https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage\" accept=\"application/pdf\" form-data-name=\"file\"></scb-file-input>", h("br", null), h("br", null), "<script>", h("div", { class: "ml-3" }, "window.addEventListener('DOMContentLoaded', function() {", h("div", { class: "ml-3" }, "var upload = document.querySelector('scb-file-input#preFillDemo');", h("br", null), h("br", null), "upload.files = [", h("div", { class: "ml-3" }, "{name: 'Josh_CV.pdf', loadStatus: 100, uploaded: true},", h("br", null), "{name: 'Alex_CV.pdf', loadStatus: 100, uploaded: true}"), "];"), "});"), "</script>"), h("h2", null, "Manual Upload Trigger"), h("scb-file-input", { id: "manualUploadDemo", "no-auto": true, method: "post", target: "https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage", "form-data-name": "file", class: "mb-0" }), h("button", { id: "uploadButton" }, "Start Upload(s)"), h("code", { class: "mb-3 d-block p-3" }, "<scb-file-input id=\"manualUploadDemo\" no-auto method=\"post\" target=\"https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage\" form-data-name=\"file\"></scb-file-input>", h("br", null), "<button id=\"uploadButton\">Start Upload</button>", h("br", null), h("br", null), "<script>", h("div", { class: "ml-3" }, "window.addEventListener('DOMContentLoaded', function() {", h("div", { class: "ml-3" }, "var upload = document.querySelector('scb-file-input#manualUploadDemo');", h("br", null), "var uploadButton = document.getElementById('uploadButton');", h("br", null), h("br", null), "uploadButton.addEventListener('click', function() {", h("div", { class: "ml-3" }, "upload.uploadFiles();"), "});"), "});"), "</script>")));
        };
        FileInputPage.prototype.componentDidLoad = function () {
            this.initCustomizingRequestDemo();
            this.initRawFilesDemo();
            this.initPreFillDemo();
            this.initManualUploadDemo();
            this.initResponseDemo();
        };
        FileInputPage.prototype.addScript = function (selector, script) {
            var scriptElem = document.createElement('script');
            var elem = document.querySelector(selector);
            scriptElem.innerHTML = script;
            elem.parentNode.appendChild(scriptElem);
        };
        FileInputPage.prototype.initCustomizingRequestDemo = function () {
            var script = 'var upload = document.querySelector(\'scb-file-input#customizingRequestDemo\');\n' +
                '\n' +
                '    upload.addEventListener(\'upload-before\', function(event) {\n' +
                '      console.log(\'upload xhr before open: \', event.detail.xhr);\n' +
                '\n' +
                '      // Prevent the upload request:\n' +
                '      // event.preventDefault();\n' +
                '\n' +
                '      var file = event.detail.file;\n' +
                '\n' +
                '      // Custom upload request url for file\n' +
                '      file.uploadTarget = upload.target + \'/\' + file.name;\n' +
                '\n' +
                '      // Custom name in the Content-Disposition header\n' +
                '      file.formDataName = \'attachment\';\n' +
                '    });\n' +
                '\n' +
                '    upload.addEventListener(\'upload-request\', function(event) {\n' +
                '      console.log(\'upload xhr after open: \', event.detail.xhr);\n' +
                '\n' +
                '      event.detail.xhr.setRequestHeader(\'X-File-Name\', event.detail.file.name);\n' +
                '      event.detail.formData.append(\'documentId\', 1234);\n' +
                '    });\n' +
                '\n' +
                '    upload.addEventListener(\'upload-start\', function(event) {\n' +
                '      console.log(\'upload xhr after send: \', event.detail.xhr);\n' +
                '    });';
            this.addScript('scb-file-input#customizingRequestDemo', script);
        };
        FileInputPage.prototype.initRawFilesDemo = function () {
            var script = '              var upload = document.querySelector(\'scb-file-input#rawFilesDemo\');\n' +
                '  \n' +
                '              upload.addEventListener(\'upload-request\', function(event) {\n' +
                '                event.preventDefault();\n' +
                '                event.detail.xhr.send(event.detail.file);\n' +
                '              });\n';
            this.addScript('scb-file-input#rawFilesDemo', script);
        };
        FileInputPage.prototype.initPreFillDemo = function () {
            var script = 'var upload = document.querySelector(\'scb-file-input#preFillDemo\');\n' +
                '    upload.files = [\n' +
                '      {name: \'Josh_CV.pdf\', loadStatus: 100, uploaded: true},\n' +
                '      {name: \'Alex_CV.pdf\', loadStatus: 100, uploaded: true}\n' +
                '    ];';
            this.addScript('scb-file-input#preFillDemo', script);
        };
        FileInputPage.prototype.initManualUploadDemo = function () {
            var script = 'var manualUploadDemo = document.querySelector(\'scb-file-input#manualUploadDemo\');\n' +
                '           var uploadButton = document.getElementById(\'uploadButton\');\n' +
                '\n' +
                '           uploadButton.addEventListener(\'click\', function() {\n' +
                '             manualUploadDemo.uploadFiles();\n' +
                '           });';
            this.addScript('scb-file-input#manualUploadDemo', script);
        };
        FileInputPage.prototype.initResponseDemo = function () {
            var script = 'var upload = document.querySelector(\'scb-file-input#responseDemo\');\n' +
                '\n' +
                '              upload.addEventListener(\'upload-response\', function(event) {\n' +
                '                console.log(\'upload xhr after server response: \', event.detail.xhr);\n' +
                '                event.detail.file.error = \'Custom server error message.\';\n' +
                '\n' +
                '                // Interpret any server response as success:\n' +
                '                // event.detail.xhr.status = 200;\n' +
                '              });';
            this.addScript('scb-file-input#responseDemo', script);
        };
        Object.defineProperty(FileInputPage, "is", {
            get: function () { return "file-input-page"; },
            enumerable: true,
            configurable: true
        });
        return FileInputPage;
    }());
    var ScbFileInput = /** @class */ (function () {
        function ScbFileInput() {
            this.files = [];
            this.type = 'primary';
            this.maxFiles = 0;
            this.nodrop = false;
            this.noAuto = false;
            this.maxFileSize = 0;
        }
        ScbFileInput.prototype.componentWillLoad = function () {
            this.element = this.el;
            var that = this;
            this.element.uploadFiles = function () {
                that.uploadFiles();
            };
        };
        /**
         * Fire hidden input click event on Button click
         */
        ScbFileInput.prototype.openFileInput = function () {
            var hiddenInput = this.el.getElementsByClassName('scb-fi-hidden')[0];
            hiddenInput.click();
        };
        /**
         * Remove the file from files list and aborting all pending actions about it
         * @param {number} index - index of a file in a list
         */
        ScbFileInput.prototype.removeFile = function (index) {
            var _this = this;
            var files = this.element.files;
            var file = files[index];
            if (file.reading) {
                file.fileReader.abort();
            }
            if (file.uploading) {
                file.xhr.abort();
            }
            files.splice(index, 1);
            this.element.files = [];
            setTimeout(function () { return _this.element.files = files.slice(); });
            console.log(this.cancelDefaultDragEnter);
            console.log(this.cancelDefaultDragOver);
            console.log(this.onDrop);
        };
        /**
         * Retry the upload action for a single file
         * @param {number} index - index of a file in a list
         */
        ScbFileInput.prototype.retryUpload = function (index) {
            var file = this.element.files[index];
            if (this.isLoadingAborted) {
                this.uploadFile(file);
            }
        };
        /**
         * Manually upload files
         */
        ScbFileInput.prototype.uploadFiles = function () {
            var _this = this;
            this.files.forEach(function (file) { return file.isRead && _this.uploadFile(file); });
        };
        /**
         * Check if loading of a file was aborted
         * @param {Object} file - file object
         * @returns {boolean}
         */
        ScbFileInput.prototype.isLoadingAborted = function (file) {
            return (Boolean)(file.uploadEnded && file.loadStatus !== 100);
        };
        ScbFileInput.prototype.cancelDefaultDragEnter = function (event) {
            event.preventDefault();
            return false;
        };
        ScbFileInput.prototype.cancelDefaultDragOver = function (event) {
            event.preventDefault();
            return false;
        };
        ScbFileInput.prototype.onDrop = function (e) {
            event.preventDefault();
            if (!this.nodrop) {
                var dt = e.dataTransfer;
                this.addFiles(dt.files);
            }
            return false;
        };
        /**
         * Handle the file select event
         * @param {Object} event - Files select event
         */
        ScbFileInput.prototype.onFileSelect = function (event) {
            this.addFiles(event.target.files);
            event.target.value = '';
        };
        /**
         * Validate, add files to files list and read them
         * @param {Array} files
         */
        ScbFileInput.prototype.addFiles = function (files) {
            var _this = this;
            var diff = this.maxFiles - this.element.files.length;
            if (files.length > 0 && (this.maxFiles === 0 || diff > 0)) {
                var lastSelectedFiles_1 = this.element.files;
                var filesArray_1 = [];
                this.element.files = [];
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var item = files_1[_i];
                    if (this.isAcceptedFileType(item) && this.isPassedFileSize(item)) {
                        filesArray_1.push(item);
                    }
                }
                if (this.maxFiles > 0 && filesArray_1.length > diff) {
                    filesArray_1.length = diff;
                }
                filesArray_1.forEach(function (file, i) {
                    file.elemId = 'file' + i + Date.now();
                });
                setTimeout(function () { return _this.element.files = lastSelectedFiles_1.concat(filesArray_1); });
                filesArray_1.forEach(function (file) { return _this.readFile(file); });
            }
        };
        /**
         * Check if file is accepted type
         * @param {Object} file
         * @returns {boolean}
         */
        ScbFileInput.prototype.isAcceptedFileType = function (file) {
            if (!this.accept) {
                return true;
            }
            var fileName = file.name.match(/\.[^\.]*$|$/)[0];
            var template = new RegExp('^(' + this.accept.replace(/[, ]+/g, '|').replace(/\/\*/g, '/.*') + ')$', 'i');
            return template.test(file.type) || template.test(fileName);
        };
        /**
         * Check if file is accepted size
         * @param {Object} file
         * @returns {boolean}
         */
        ScbFileInput.prototype.isPassedFileSize = function (file) {
            return !this.maxFileSize || file.size <= this.maxFileSize;
        };
        /**
         * Change the Retry button state
         * @param {Object} file
         */
        ScbFileInput.prototype.toggleRetryBtn = function (file) {
            var retryBtn = this.el.querySelector('#' + file.elemId + ' .scb-fi-retry-btn');
            var isAborted = this.isLoadingAborted(file);
            if (retryBtn) {
                retryBtn.classList.toggle('d-inline-block', isAborted);
            }
        };
        /**
         * Read file after add
         * @param {Object} file
         */
        ScbFileInput.prototype.readFile = function (file) {
            var _this = this;
            var reader = new FileReader();
            var isRequestDataPresent = this.method && this.target && this.formDataName;
            this.changeFileUploadProgress(file, 0, 'Start reading');
            reader.onprogress = function (e) {
                var percentage = Math.round(e.loaded / e.total * 100);
                _this.changeFileUploadProgress(file, percentage, 'Reading');
            };
            reader.onloadend = function () {
                _this.toggleRetryBtn(file);
            };
            reader.onload = function () {
                file.reading = false;
                file.isRead = true;
                _this.changeFileUploadProgress(file, 100, isRequestDataPresent ? 'Queued' : '');
                if (isRequestDataPresent && !_this.noAuto) {
                    _this.uploadFile(file);
                }
            };
            file.reading = true;
            reader.readAsDataURL(file);
            file.fileReader = reader;
        };
        /**
         * Upload file after read or retry button click
         * @param {Object} file
         */
        ScbFileInput.prototype.uploadFile = function (file) {
            var _this = this;
            if (!file.uploading) {
                var request_1 = new XMLHttpRequest;
                var stalledTimeout_1;
                file.xhr = request_1;
                request_1.upload.onprogress = function (e) {
                    clearTimeout(stalledTimeout_1);
                    var loaded = e.loaded;
                    var total = e.total;
                    var progress = Math.round(100 * (loaded / total));
                    file.loaded = loaded;
                    file.indeterminate = 0 >= loaded || loaded >= total;
                    if (file.error) {
                        file.status = '';
                        file.indeterminate = undefined;
                    }
                    else if (!file.abort) {
                        if (100 > progress) {
                            stalledTimeout_1 = setTimeout(function () {
                                _this.changeFileUploadProgress(file, progress, 'Stalled');
                            }, 2000);
                        }
                        else {
                            file.uploading = false;
                        }
                        _this.changeFileUploadProgress(file, progress, 'Uploading');
                        _this.el.dispatchEvent(new CustomEvent('upload-progress', {
                            detail: {
                                file: file,
                                xhr: request_1,
                            },
                        }));
                    }
                };
                request_1.onreadystatechange = function () {
                    if (request_1.readyState === 4) {
                        clearTimeout(stalledTimeout_1);
                        file.indeterminate = file.uploading = false;
                        if (file.abort) {
                            _this.changeFileUploadProgress(file, file.loadStatus, 'Aborted');
                        }
                        else {
                            var uploadResponseNotCanceled = _this.el.dispatchEvent(new CustomEvent('upload-response', {
                                detail: {
                                    file: file,
                                    xhr: request_1,
                                },
                                cancelable: true,
                            }));
                            if (!uploadResponseNotCanceled) {
                                return;
                            }
                            if (request_1.status === 0) {
                                file.error = 'Server unavailable';
                            }
                            else if (request_1.status >= 500) {
                                file.error = 'Unexpected server error';
                            }
                            else if (request_1.status >= 400) {
                                file.error = 'Forbidden';
                            }
                            file.complete = false;
                            _this.el.dispatchEvent(new CustomEvent('upload-' + (file.error ? 'error' : 'success'), {
                                detail: {
                                    file: file,
                                    xhr: request_1,
                                },
                            }));
                            var loadedPercentage = file.error ? file.loadStatus : 100;
                            var uploadStatus = file.error ? ('Error: ' + file.error) : '';
                            _this.changeFileUploadProgress(file, loadedPercentage, uploadStatus);
                            file.uploadEnded = true;
                            file.uploaded = !file.error;
                        }
                    }
                };
                request_1.upload.onloadstart = function () {
                    _this.el.dispatchEvent(new CustomEvent('upload-start', {
                        detail: {
                            file: file,
                            xhr: request_1,
                        },
                    }));
                };
                request_1.upload.onloadend = function () {
                    file.uploadEnded = true;
                    _this.toggleRetryBtn(file);
                };
                var uploadBeforeNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-before', {
                    detail: {
                        file: file,
                        xhr: request_1,
                    },
                    cancelable: true,
                }));
                if (!uploadBeforeNotCanceled) {
                    return;
                }
                var formData = new FormData;
                file.uploadTarget = this.target || '';
                file.formDataName = this.formDataName;
                this.changeFileUploadProgress(file, 0, 'Start uploading');
                formData.append(file.formDataName, file, file.name);
                request_1.open(this.method, file.uploadTarget, true);
                this.configureXhr(request_1);
                file.indeterminate = true;
                file.uploading = true;
                file.uploadEnded = false;
                file.complete = file.abort = file.error = file.held = false;
                var uploadRequestNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-request', {
                    detail: {
                        file: file,
                        xhr: request_1,
                        formData: formData,
                    },
                    cancelable: true,
                }));
                if (uploadRequestNotCanceled) {
                    request_1.send(formData);
                }
            }
        };
        /**
         * Setup the XHR Request
         * @param {Object} request - upload request
         */
        ScbFileInput.prototype.configureXhr = function (request) {
            var headers;
            if (typeof this.headers === 'string') {
                try {
                    headers = JSON.parse(this.headers.replace(new RegExp('\'', 'g'), '\"'));
                }
                catch (error) {
                    headers = undefined;
                }
            }
            for (var header in headers) {
                if (header) {
                    request.setRequestHeader(header, headers[header]);
                }
            }
            if (this.timeout) {
                request.timeout = this.timeout;
            }
        };
        /**
         * Show the upload progress of a file
         * @param {Object} file
         * @param {number} loadedPercentage
         * @param {string} status
         */
        ScbFileInput.prototype.changeFileUploadProgress = function (file, loadedPercentage, status) {
            var prBar = this.el.querySelector('#' + file.elemId + ' .progress-bar');
            var statusBar = this.el.querySelector('#' + file.elemId + ' .scb-fi-status');
            file.loadStatus = loadedPercentage;
            file.status = status;
            if (prBar) {
                prBar.style.width = loadedPercentage + '%';
            }
            if (statusBar) {
                statusBar.innerHTML = file.status || '';
            }
        };
        /**
         * Render view based on the component data
         * @returns view of the component
         */
        ScbFileInput.prototype.render = function () {
            var _this = this;
            var buttonClasses = (_a = {
                    'scb-fi-default-button': true,
                    btn: true
                },
                _a["btn-outline-" + this.type] = true,
                _a);
            var isMultiple = this.maxFiles !== 1;
            var buttonText = isMultiple ? 'Upload Files' : 'Select File';
            var dropLabel = isMultiple ? 'Drop files here...' : 'Drop file here...';
            var label = this.nodrop ? '' : h("span", { class: "scb-fi-label" }, h("slot", { name: "label" }), h("span", { class: "scb-fi-default-label" }, dropLabel));
            var buttonAttrs = {};
            var inputAttrs = {};
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
            return (h("div", { class: "scb-fi-wrapper" }, h("input", Object.assign({ class: "scb-fi-hidden", type: "file", onChange: function () { return _this.onFileSelect(event); } }, inputAttrs)), h("fieldset", Object.assign({ class: "scb-fi-button-wrapper", onClick: function () { return _this.openFileInput(); } }, buttonAttrs), h("slot", { name: "button" }), h("button", { class: buttonClasses }, buttonText)), label, this.files.map(function (file, i) {
                return h("div", { class: "scb-fi-row", id: file.elemId }, h("div", { class: "scb-fi-row-header" }, h("span", { class: "scb-fi-name" }, file.name), h("div", { class: "scb-fi-controls" }, h("button", { class: {
                        'scb-fi-icon-btn': true,
                        'scb-fi-retry-btn': true,
                        'd-inline-block': _this.isLoadingAborted(file),
                    }, onClick: function () { return _this.retryUpload(i); } }, h("span", { class: "scb-icon icon-reload" })), h("button", { class: "scb-fi-icon-btn close", onClick: function () { return _this.removeFile(i); } }, h("span", { "aria-hidden": "true" }, "\u00D7")))), h("div", { class: "scb-fi-status" }, file.status), h("div", { class: "progress" }, h("div", { class: (_a = {
                            'progress-bar': true
                        },
                        _a["bg-" + _this.type] = true,
                        _a), style: { width: file.loadStatus + '%' }, role: "progressbar", "aria-valuenow": "0", "aria-valuemin": "0", "aria-valuemax": "100" })));
                var _a;
            })));
            var _a;
        };
        Object.defineProperty(ScbFileInput, "is", {
            get: function () { return "scb-file-input"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScbFileInput, "properties", {
            get: function () { return { "accept": { "type": String, "attr": "accept" }, "el": { "elementRef": true }, "element": { "state": true }, "files": { "type": "Any", "attr": "files" }, "formDataName": { "type": String, "attr": "form-data-name" }, "headers": { "type": String, "attr": "headers" }, "maxFiles": { "type": Number, "attr": "max-files" }, "maxFileSize": { "type": Number, "attr": "max-file-size" }, "method": { "type": String, "attr": "method" }, "noAuto": { "type": Boolean, "attr": "no-auto" }, "nodrop": { "type": Boolean, "attr": "nodrop" }, "target": { "type": String, "attr": "target" }, "timeout": { "type": Number, "attr": "timeout" }, "type": { "type": "Any", "attr": "type" } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScbFileInput, "style", {
            get: function () { return "/**\n* A small function allowing skipping base64 encoding and simply pasting the SVG markup right in the CSS.\n* \@author Jakob Eriksen\n* \@link http://codepen.io/jakob-e/pen/doMoML\n* \@param {string} $svg - SVG image to encode\n* \@returns {string} - encoded SVG data uri\n*/\n/**\n* Characters encode\n* \@param {String} $string - character to replace\n* \@param {String} $search - string to replace character with\n* \@param {String} $replace - replace part\n* \@returns {String} - Encoded string\n*/\n.scb-icon {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  vertical-align: middle;\n  opacity: .75;\n  line-height: 1;\n}\n\n.scb-icon:hover, .scb-icon:focus {\n  opacity: 1;\n}\n\n.scb-icon::before {\n  content: '';\n  display: block;\n  width: 16px;\n  height: 16px;\n  background-size: 16px;\n  background-repeat: no-repeat;\n}\n\n.scb-icon.icon-close::before {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' class='si-glyph si-glyph-delete'%3E\a       %3Ctitle%3E1227%3C/title%3E\a       %3Cdefs%3E%3C/defs%3E\a       %3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E\a           %3Cpath d='M12.566,8 L15.611,4.956 C16.031,4.535 16.031,3.853 15.611,3.434 L12.566,0.389 C12.146,-0.031 11.464,-0.031 11.043,0.389 L7.999,3.433 L4.955,0.389 C4.534,-0.031 3.852,-0.031 3.432,0.389 L0.388,3.434 C-0.034,3.854 -0.034,4.536 0.387,4.956 L3.431,8 L0.387,11.044 C-0.034,11.465 -0.034,12.147 0.388,12.567 L3.432,15.611 C3.852,16.032 4.534,16.032 4.955,15.611 L7.999,12.567 L11.043,15.611 C11.464,16.032 12.146,16.032 12.566,15.611 L15.611,12.567 C16.031,12.146 16.031,11.464 15.611,11.044 L12.566,8 L12.566,8 Z' fill='%23434343' class='si-glyph-fill'%3E%3C/path%3E\a       %3C/g%3E\a     %3C/svg%3E\");\n}\n\n.scb-icon.icon-reload::before {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' class='si-glyph si-glyph-arrow-reload'%3E\a       %3Ctitle%3E802%3C/title%3E\a       %3Cdefs%3E%3C/defs%3E\a       %3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E\a         %3Cg transform='translate(1.000000, 2.000000)' fill='%23434343'%3E\a           %3Cpath d='M15.796,6.908 L14.234,5.21 C14.019,4.998 13.672,4.998 13.458,5.21 L11.894,6.908 C11.679,7.122 11.679,7.467 11.894,7.68 L13.188,7.68 C12.702,9.505 11.27,10.976 9.399,11.47 C7.231,12.042 4.913,11.191 3.632,9.351 L2.541,10.102 C3.807,11.921 5.884,12.966 8.039,12.966 C8.604,12.966 9.176,12.894 9.737,12.745 C12.188,12.099 14.04,10.112 14.55,7.68 L15.795,7.68 C16.01,7.467 16.01,7.122 15.796,6.908 L15.796,6.908 Z' class='si-glyph-fill'%3E%3C/path%3E\a           %3Cpath d='M4.475,6.021 C4.69,5.808 4.69,5.462 4.475,5.249 L3.018,5.249 C3.516,3.448 4.936,2.001 6.789,1.511 C8.959,0.938 11.275,1.791 12.555,3.632 L13.647,2.88 C12.049,0.585 9.161,-0.479 6.448,0.235 C4.016,0.878 2.175,2.84 1.648,5.249 L0.196,5.249 C-0.019,5.463 -0.019,5.809 0.196,6.021 L1.834,7.658 C2.048,7.87 2.396,7.87 2.61,7.658 L4.475,6.021 L4.475,6.021 Z' class='si-glyph-fill'%3E%3C/path%3E\a         %3C/g%3E\a       %3C/g%3E\a     %3C/svg%3E\");\n}\n\nscb-file-input {\n  display: block;\n  margin-bottom: 20px;\n}\n\nscb-file-input .scb-fi-wrapper {\n  width: 100%;\n  padding: 20px;\n  border: 1px dashed #363636;\n}\n\nscb-file-input .scb-fi-hidden {\n  width: 0;\n  height: 0;\n  overflow: hidden;\n  opacity: 0;\n}\n\nscb-file-input .scb-fi-button-wrapper {\n  display: inline-block;\n}\n\nscb-file-input .scb-fi-row-header {\n  display: flex;\n  justify-content: space-between;\n}\n\nscb-file-input .scb-fi-label {\n  display: inline-block;\n  margin-left: 10px;\n  vertical-align: middle;\n}\n\nscb-file-input [slot=\"label\"] + .scb-fi-default-label {\n  display: none;\n}\n\nscb-file-input [slot=\"button\"] + .scb-fi-default-button {\n  display: none;\n}\n\nscb-file-input .scb-fi-row {\n  margin-top: 10px;\n}\n\nscb-file-input .scb-fi-icon-btn,\nscb-file-input .scb-fi-icon-btn:hover,\nscb-file-input .scb-fi-icon-btn:focus {\n  background: none;\n  outline: none;\n  box-shadow: none;\n  border: none;\n  cursor: pointer;\n  line-height: 1;\n}\n\nscb-file-input .scb-fi-wrapper .progress-bar {\n  transition: none;\n}\n\nscb-file-input .scb-fi-retry-btn {\n  display: none;\n}"; },
            enumerable: true,
            configurable: true
        });
        return ScbFileInput;
    }());
    exports.FileInputPage = FileInputPage;
    exports.ScbFileInput = ScbFileInput;
    Object.defineProperty(exports, '__esModule', { value: true });
});
