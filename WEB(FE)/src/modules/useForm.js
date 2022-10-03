import { useCallback, useState } from "react";

export function useForm(initialState) {
  const [state, setState] = useState(initialState);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((state) => ({ ...state, [name]: value }));
  }, []);

  return [state, onChange];
}

export function useAndSetForm(initialState) {
  const [state, setState] = useState(initialState);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((state) => ({ ...state, [name]: value }));
  }, []);

  return [state, setState, onChange];
}