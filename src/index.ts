import { useCallback, useEffect, useMemo, useRef } from 'react'

export const useTransitions = <T extends Record<string, Record<string, ReadonlyArray<string | number>>>>(config: T) => {
  const s = useRef({
    items: config,
    elem: {} as { [K in keyof T]: HTMLElement | null },
    last: {} as { [K in keyof T]: string[] },
  })
  useEffect(() => void (s.current.items = config))

  const exec = async (key: keyof T, items: (string | number)[]): Promise<void> => {
    const [next, ...rest] = items
    if (!next) return
    if (typeof next === 'number') return new Promise((res) => setTimeout(res, next)).then(() => exec(key, rest))
    ;(s.current.last[key] || []).forEach((item) => item && s.current.elem[key]?.classList.remove(item))
    const list = next.split(' ')
    list.forEach((item) => item && s.current.elem[key]?.classList.add(item))
    s.current.last[key] = list
    return exec(key, rest)
  }

  const bind = useCallback(
    <K extends keyof T>(target: K) =>
      <H extends HTMLElement>(node: H | null) =>
        (s.current.elem[target] = node),
    [],
  )

  const run = useCallback((action: { [K in keyof T]: keyof T[K] }[keyof T]) => {
    return Promise.all(
      Object.keys(config).map((key) => {
        const target = config[key]
        const anim = target?.[action as any]
        if (anim) return exec(key, anim as any)
        return Promise.resolve()
      }),
    )
  }, [])

  const refs = useMemo(() => {
    return new Proxy(s.current.elem, {
      get: (_t, key) => s.current.elem[key as any],
    })
  }, [])

  return [bind, run, refs] as const
}

export default useTransitions
