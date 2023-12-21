export const executeMutation = async (
  mutationFn: Function,
  query: string,
  variables: any,
  onSuccess: Function,
  onFailure: Function
) => {
  try {
    const data = await mutationFn(query, variables);
    onSuccess(data);
  } catch (err) {
    onFailure(err);
  }
};
