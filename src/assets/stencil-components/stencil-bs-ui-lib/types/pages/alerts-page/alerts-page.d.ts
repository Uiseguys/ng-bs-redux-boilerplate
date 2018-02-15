import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
export declare class AlertsPage {
    hasAnimatableDismissibleAlert: boolean;
    hasDismissibleAlert: boolean;
    alertTypes: BootstrapThemeColor[];
    onAnimatableAlertDismiss(): void;
    onAlertDismiss(): void;
    render(): JSX.Element[];
    private getDismissibleAlert(animatable);
    private getCreateAlertButton(animatable);
}
