import React, { useState } from 'react';
import { Field, FormikProps } from 'formik';

interface WiredFieldProps {
    name: string;
    type: string;
    className: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: FormikProps<any>;
}

const WiredField: React.FC<WiredFieldProps> = ({ name, type, className, formik }) => {
    const [initialValue] = useState(formik.values[name]);

    return (
        <Field
            name={name}
            type={type}
            className={className}
            onBlur={() => {
                if (formik.touched[name] && formik.values[name] !== initialValue) {
                    formik.submitForm();
                }
            }}
        />
    );
};

export default WiredField;