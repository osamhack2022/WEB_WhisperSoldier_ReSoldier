import { useCallback, useState } from "react";

export default function useForm(initialState) {
  const [state, setState] = useState(initialState);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((state) => ({ ...state, [name]: value }));
  }, []);

  return [state, onChange];
}
