import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
export declare class CwcProgressBar {
    text: string;
    progressBarType: BootstrapThemeColor;
    classes: string;
    closable: boolean;
    striped: boolean;
    animated: boolean;
    height: number;
    progress: number;
    textWatchHandler(val: any): void;
    progressWatchHandler(val: any): void;
    watchHandler(val: any): void;
    limit(text: string, count: number): string;
    getClassList(): string;
    render(): JSX.Element;
}
