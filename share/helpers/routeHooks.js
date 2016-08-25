import arity from 'util-arity';

export const hookContext = (context) => {
  return (hook) => {
    const hookLength = hook.length - 1;
    return arity(hookLength, (...args) => {
      return hook.apply(null, args.slice(0,hookLength).concat(context));
    });
  };
};
