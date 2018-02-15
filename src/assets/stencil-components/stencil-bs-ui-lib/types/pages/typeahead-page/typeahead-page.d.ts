export declare class StencilComponent {
    complex: {
        type: string;
        data: {
            name: string;
            capital: string;
        };
    }[];
    result: any;
    typeaheadOnSubmit(e: any): void;
    searchString: string;
    complexResult: any[];
    data: string[];
    render(): JSX.Element[];
}
