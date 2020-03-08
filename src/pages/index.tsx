import React, { ReactNode } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const FormItem = Form.Item;

interface Props {
  label: string;
  error: any;
  children: any;
}
function InputField(props: Props) {
  const { label, error, children } = props;
  return (
    <FormItem
      label={label}
      validateStatus={error ? 'error' : ''}
      help={error ? error.message : ''}
      hasFeedback
    >
      {children}
    </FormItem>
  );
}

export default () => {
  const schema = yup.object().shape({
    name: yup.string().required('name不能为空'),
    age: yup
      .number()
      .required('age不能为空')
      .min(10, '最小是10'),
  });

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    triggerValidation,
  } = useForm({
    validationSchema: schema,
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleSetValue = (field: string, val: any) => {
    setValue(field, val);
    triggerValidation(field);
  };

  React.useEffect(() => {
    register({ name: 'name' });
    register({ name: 'city' });
    register({ name: 'age' });
  }, [register]);

  return (
    <div>
      <h1>antd react-hook-form yup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="姓名" error={errors.name}>
          <Input
            name="name"
            onChange={e => handleSetValue('name', e.target.value)}
          />
        </InputField>

        <InputField label={'年纪'} error={errors.age}>
          <InputNumber
            name="age"
            onChange={val => handleSetValue('age', val)}
          />
        </InputField>

        <InputField label="城市" error={errors.city}>
          <Input
            name="city"
            onChange={e => handleSetValue('city', e.target.value)}
          />
        </InputField>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
