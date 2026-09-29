import React from 'react';
import {
  Button as FluentButton,
  ButtonProps as FluentButtonProps,
} from '@fluentui/react-components';

export type ButtonProps = FluentButtonProps & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <FluentButton {...props}>
      {children}
    </FluentButton>
  );
};

export default Button;