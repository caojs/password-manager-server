export function injectProps(target, name, descriptor) {
  const oldRender = descriptor.value;

  descriptor.value = function injectPropsRender() {
    return oldRender.call(this, this.props);
  };

  return descriptor;
}
