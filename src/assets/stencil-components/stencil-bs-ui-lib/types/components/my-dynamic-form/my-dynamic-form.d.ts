export declare class MyDynamicForm {
    allTitles: any;
    allIds: any;
    data: any;
    changedData: any;
    filledData: any;
    invalidMessage: string;
    changeValueChecked: boolean;
    /**
     * @desc Field data change callback
     * @Prop {any} schema - JSON-schema
     * @Prop {any} form - form for JSON-schema
     */
    schema: any;
    form: any;
    ajv: any;
    el: HTMLElement;
    postValueHandler(CustomEvent: any): void;
    mapping: Object;
    /**
     * Functions for filling data object
     */
    fillData(fieldId: any, fieldValue: any, currentFormData: any): any;
    /**
     * Functions for deleting properties which have value "null"
     */
    deletePropsWithoutData(clearedFormData: any): any;
    /**
     * Call functions for validate of all form fields
     */
    validateForm(): void;
    /**
     * Function for flatting data object for validation
     */
    flatDataObject(data: any): any;
    updateValidationMessage(validate: any): any;
    /**
     * Getting fields based on properties in JSON-schema
     */
    createField(schemaProps: any, prop: any, schemaPropKey: any): JSX.Element;
    createForm(schemaProps: any, schemaPropKey: any): any;
    render(): JSX.Element;
    componentWillLoad(): void;
}
