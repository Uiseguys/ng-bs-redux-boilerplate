import { EventEmitter } from '@stencil/core';
export declare class ScbModal {
    el: any;
    btntype: string;
    modalTitle: string;
    modalContent: string;
    centered: boolean;
    animation: boolean;
    size: string;
    backdrop: any;
    keyboard: boolean;
    modalfocus: boolean;
    show: boolean;
    onOpenModal: EventEmitter;
    onCloseModal: EventEmitter;
    openModalHandler(): void;
    closeModalHandler(): void;
    render(): JSX.Element;
}
