import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

export const MultipleSelection = () => {
  const [field, setField] = useState<string[]>([]);

  return (
    <Form.Group as={Col} controlId="my_multiselect_field">
      <Form.Label>My multiselect</Form.Label>
      <Form.Control
        as="select"
        multiple
        value={field}
        onChange={() => {}}
        onClick={(e: any) => {
          const index = field.indexOf(e.target.value);
          if (index > -1) {
            const copyState = field.slice();
            copyState.splice(index, 1);
            console.log("primero", copyState);
            setField(copyState);
          } else {
            const copyState = field.slice();
            copyState.push(e.target.value);
            console.log("segundo", copyState);
            setField(copyState);
          }
        }}
      >
        <option value="1">Field 1</option>
        <option value="2">Field 2</option>
        <option value="3">Field 3</option>
      </Form.Control>
    </Form.Group>
  );
};
