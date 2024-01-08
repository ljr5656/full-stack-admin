import React from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const onFinish = (values: any) => {
		console.log(values);
		navigate('/');
	};
	const onFinishFailed = (values: any) => {
		console.log(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	const onFill = () => {
		form.setFieldsValue({ username: 'custom', password: '123qwe' });
	};
	return (
		<Form
			form={form}
			name='basic'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<Form.Item<FieldType> label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
				<Input />
			</Form.Item>

			<Form.Item<FieldType> label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Space>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
					<Button htmlType='button' onClick={onReset}>
						Reset
					</Button>
					<Button type='link' htmlType='button' onClick={onFill}>
						custom login
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default Login;
