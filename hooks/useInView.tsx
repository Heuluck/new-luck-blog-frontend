import { useState, useRef, useLayoutEffect } from "react";

const useInView = (
    options: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px 0px",
        threshold: 1,
    },
    /** 是否只触发一次 */
    triggerOnce = false,
): [React.LegacyRef<HTMLElement> | undefined, boolean] => {
    const [inView, setInView] = useState(false);
    const targetRef = useRef(null);

    useLayoutEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    setInView(false);
                }
            });
        }, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [options, triggerOnce]);

    return [targetRef, inView];
};

export default useInView;
