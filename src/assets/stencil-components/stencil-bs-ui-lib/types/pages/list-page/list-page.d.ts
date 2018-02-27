export declare class ListPage {
    users1: any[];
    users2: any[];
    customEventHandler(event: any): void;
    componentWillLoad(): void;
    initUsers1Data(count?: number): void;
    initUsers2Data(count?: number): void;
    getUser2Template(): JSX.Element;
    getUserTemplate(): JSX.Element;
    getUsersPage(): number;
    getUsers(count?: number): Promise<{}>;
    render(): JSX.Element;
}
