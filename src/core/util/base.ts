'use strict'

export type ArrayItem<A> = A extends (infer T)[] ? T : never;

export type OrMixin<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 多继承，既有函数式的灵活性，又有 class 的表达能力
 * @example
 *
  class Base {
    ...
  }

  function Mixin1(base: typeof Base) {
    return class Class extends base {
      ...
    };
  }

  function Mixin2(base: any) {
    return class Class extends base {
      ...
    };
  }

  const Class = With(Base, Mixin1, Mixin2);
 *
 * @param Base
 * @param mixin
 */
export function With<B, T extends ((Base: Constructor<B>) => Constructor)[]>(
  Base: Constructor<B>,
  ...mixin: T
) {
  type MixinType = OrMixin<InstanceType<ReturnType<ArrayItem<T>>>>
  return mixin.reduce((Class, Mixin) => {
    return Mixin(Class)
  }, Base) as Constructor<B & MixinType>
}