import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
export declare class CwcTag {
    text: string;
    tagType: BootstrapThemeColor;
    classes: string;
    link: string;
    imgLink: string;
    closable: boolean;
    rounded: boolean;
    limitTo: number;
    element: HTMLElement;
    close(e?: UIEvent): void;
    textWatchHandler(val: any): void;
    watchHandler(val: any): void;
    limit(text: string, count: number): string;
    getClassList(): string;
    render(): JSX.Element;
}
