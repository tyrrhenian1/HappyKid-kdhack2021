import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Account = ({resetFields}) => {
    const [form] = Form.useForm();
    const onFinish = values => {
      const request = {
          email : localStorage.getItem('email'),
      };
      if(!values.parent_email && !values.password){
        return;
      }else{
        request.password = values.password;
        request.parent_email = values.parent_email;
      }
      fetch(`http://localhost:5000/api/user/update`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(request) // body data type must match "Content-Type" header
      }).then(e => {
        debugger
          if(e.ok){
            form.resetFields();
              alert('Успешно!');
          }
          return e.json();
      }).then(e => {
        debugger
        localStorage.setItem('parent_email', e.parent_email)});
  }
  return(
    <div className="card_wrapper">
    <Form
      name="normal_login"
      form={form}
      className="login-form card"
      initialValues={{
        remember: true,
      }}
      style={{margin : 'auto'}}
      onFinish={onFinish}
    >
        <Form.Item
            name="password"
            rules={[
            {
                required: false,
                message: 'Ты забыл ввести пароль!',
            },
            ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="password" placeholder="Новый пароль" />
    </Form.Item>
    <Form.Item
    name="parent_email"
    rules={[
      {
        required: false,
        message: 'Ты забыл ввести почту родителя!',
      },
    ]}
    >
    <Input
      prefix={<LockOutlined className="site-form-item-icon" />}
      pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" 
      type="email"
      placeholder="Новая почта родителя"
    />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">Изенить данные</Button>
    </Form.Item>
    </Form>
    </div>);
}

export { Account };