# Thunk Middleware
- Thunk middleware: The "dispatch" argument is the function that is provided by Redux Thunk. It allows us to dispatch multiple actions.
- Thunk middleware allows us to return a function instead of an action. The function will be called by Redux when the time is right. We'll use thunk to delay the dispatch of our action. This is useful when we want to do something asynchronously. In this example, we're dispatching a function that returns a promise which is then handled by the promise middleware. We're also using the thunk middleware to handle the action once the promise is resolved or rejected. The "dispatch" argument is the function that we can use to dispatch actions.

```
export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.message, 'error');
    }
  };
};
```