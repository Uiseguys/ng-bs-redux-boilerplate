export declare class StencilComponent {
    complex: {
        type: string;
        data: {
            name: string;
            capital: string;
        };
    }[];
    searchString: string;
    complexResult: any[];
    data: string[];
    result: any;
    typeaheadOnSubmit(e: any): void;
    render(): JSX.Element[];
}
