import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
export declare class ScbBadge {
    type: BootstrapThemeColor;
    pill: boolean;
    link: string;
    render(): JSX.Element;
    private getClassList();
}
