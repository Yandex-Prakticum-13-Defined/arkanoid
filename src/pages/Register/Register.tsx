import React, { FC, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { VALIDATION } from '../../utils/constants/validation';
import { signUp } from '../../API/authAPI';
import { getUser } from '../../store/slice/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ERoutes } from '../../utils/constants/routes';
import { additionalUserData } from '../../utils/constants/additionalUserData';

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    formState: {
      isValid
    },
    control,
    getValues,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      login: '',
      email: '',
      password: ''
    }
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      firstName,
      login,
      email,
      password
    } = getValues();

    const userData = {
      first_name: firstName,
      login,
      email,
      password,
      ...additionalUserData
    };

    try {
      await signUp(userData);
      await dispatch(getUser());
      reset();
      navigate(ERoutes.START, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='register'>
      <Form
        title='Регистрация'
        handleSubmit={handleSubmit}
        button={{
          type: 'submit',
          title: 'Зарегистрироваться',
          disabled: !isValid
        }}
        linkTo={ERoutes.LOGIN}
        linkText='Авторизация'
      >
        <Input
          name='firstName'
          type='text'
          placeholder='Имя'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.name
          }}
        />
        <Input
          name='login'
          type='text'
          placeholder='Логин'
          control={control}
          rules={{
            required: VALIDATION.required,
            minLength: VALIDATION.minLength_3,
            maxLength: VALIDATION.maxLength_20,
            pattern: VALIDATION.login
          }}
        />
        <Input
          name='email'
          type='email'
          placeholder='Email'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.email
          }}
        />
        <Input
          name='password'
          type='password'
          placeholder='Пароль'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.password,
            minLength: VALIDATION.minLength_8
          }}
        />
      </Form>
    </section>
  );
};

export default Register;
