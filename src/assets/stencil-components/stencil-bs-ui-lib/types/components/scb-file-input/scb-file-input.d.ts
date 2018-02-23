import { HostElement } from '@stencil/core';
import { BootstrapThemeColor } from '../../common/index';
export declare class ScbFileInput {
    el: HostElement;
    files: any[];
    type: BootstrapThemeColor;
    maxFiles: number;
    nodrop: boolean;
    noAuto: boolean;
    accept: string;
    maxFileSize: number;
    method: string;
    target: string;
    timeout: number;
    headers: string;
    formDataName: string;
    private element;
    componentWillLoad(): void;
    /**
     * Fire hidden input click event on Button click
     */
    openFileInput(): void;
    /**
     * Remove the file from files list and aborting all pending actions about it
     * @param {number} index - index of a file in a list
     */
    removeFile(index: number): void;
    /**
     * Retry the upload action for a single file
     * @param {number} index - index of a file in a list
     */
    retryUpload(index: number): void;
    /**
     * Manually upload files
     */
    uploadFiles(): void;
    /**
     * Check if loading of a file was aborted
     * @param {Object} file - file object
     * @returns {boolean}
     */
    private isLoadingAborted(file);
    private cancelDefaultDragEnter(event);
    private cancelDefaultDragOver(event);
    private onDrop(e);
    /**
     * Handle the file select event
     * @param {Object} event - Files select event
     */
    private onFileSelect(event);
    /**
     * Validate, add files to files list and read them
     * @param {Array} files
     */
    private addFiles(files);
    /**
     * Check if file is accepted type
     * @param {Object} file
     * @returns {boolean}
     */
    private isAcceptedFileType(file);
    /**
     * Check if file is accepted size
     * @param {Object} file
     * @returns {boolean}
     */
    private isPassedFileSize(file);
    /**
     * Change the Retry button state
     * @param {Object} file
     */
    private toggleRetryBtn(file);
    /**
     * Read file after add
     * @param {Object} file
     */
    private readFile(file);
    /**
     * Upload file after read or retry button click
     * @param {Object} file
     */
    uploadFile(file: any): void;
    /**
     * Setup the XHR Request
     * @param {Object} request - upload request
     */
    private configureXhr(request);
    /**
     * Show the upload progress of a file
     * @param {Object} file
     * @param {number} loadedPercentage
     * @param {string} status
     */
    private changeFileUploadProgress(file, loadedPercentage, status);
    /**
     * Render view based on the component data
     * @returns view of the component
     */
    render(): JSX.Element;
}
