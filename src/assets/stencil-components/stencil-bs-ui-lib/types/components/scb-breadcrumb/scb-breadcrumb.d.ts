import { IBreadcrumbItem } from './../../common/index';
export declare class ScbBreadcrumb {
    items: IBreadcrumbItem[];
    render(): JSX.Element;
    private getSpanBreadcrumb(item);
    private getAnchorBreadcrumb(item);
}
