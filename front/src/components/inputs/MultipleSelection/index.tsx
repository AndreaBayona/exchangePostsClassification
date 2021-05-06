import React from "react";
import { Col, Form } from "react-bootstrap";
import {FormItem} from "./styles";

type Props = {
  label: string;
  options: string[];
  disabled: boolean;
  dispatch: (newValue: string[]) => void;
};

export const MultipleSelection: React.FC<Props> = ({
  label,
  options,
  disabled,
  dispatch,
}) => {
  const [field, setField] = React.useState<string[]>([]);
  return (
   <FormItem>
    <Form.Group as={Col} controlId="my_multiselect_field">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        multiple
        disabled={disabled}
        value={field}
        onChange={() => dispatch(field)}
        onClick={(e: any) => {
          const index = field.indexOf(e.target.value);
          if (index > -1) {
            const copyState = field.slice();
            copyState.splice(index, 1);
            setField(copyState);
          } else {
            const copyState = field.slice();
            copyState.push(e.target.value);
            setField(copyState);
          }
        }}
      >
        {options.map((field) => {
          return <option value={field}>{field}</option>;
        })}
      </Form.Control>
    </Form.Group>
   </FormItem>
  );
};
