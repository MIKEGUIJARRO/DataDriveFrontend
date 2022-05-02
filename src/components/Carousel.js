import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Carousel = ({ children, handlerRef }) => {
    const ref = useRef(null);

    const [elements, setElements] = useState({ list: [], activeIndex: 0 });
    const [dimensions, setDimensions] = useState();

    useImperativeHandle(handlerRef, () => ({
        nextChildMethod() {
            nextHandler();
        },
        prevChildMethod() {
            prevHandler();
        },
    }));

    useEffect(() => {
        const newElements = { list: [], activeIndex: 0 };
        children.forEach((child, i) => {
            newElements.list.push({
                state: i === 0 ? 0 : 1,
            });
        });

        setElements(newElements);
        setDimensions({
            height: ref.current.offsetHeight,
            width: ref.current.offsetWidth
        });

        function handleResize() {
            // Not really efficient ...
            setDimensions({
                height: ref.current.offsetHeight,
                width: ref.current.offsetWidth
            });
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const prevHandler = () => {
        const i = elements.list.findIndex((item) => item.state === 0);
        if (i === 0) {
            return
        }
        elements.list[i]['state'] = 1;
        elements.list[i - 1]['state'] = 0;
        elements.activeIndex = i - 1;
        setElements({ ...elements });
    }

    const nextHandler = () => {
        const i = elements.list.findIndex((item) => item.state === 0);

        if (i === elements.list.length - 1) {
            return
        }
        elements.list[i]['state'] = -1;
        elements.list[i + 1]['state'] = 0;
        elements.activeIndex = i + 1;
        setElements({ ...elements });
    }

    const variantsGroup = {
        transformX: {
            x: - (dimensions ? dimensions.width : 0) * elements.activeIndex,
        }
    }

    const variantsItems = {
        left: {
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: 'linear',
                damping: 0
            },

        },
        center: {
            opacity: [0, 1],
            transition: {
                duration: 0.5,
                ease: 'linear',
                damping: 0
            },

        },
        right: {
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: 'linear',
                damping: 0
            },
        },
    }

    return (
        <div ref={ref}>
            <motion.div
                className='flex flex-row flex-nowrap justify-start'
                variants={variantsGroup}
                animate={
                    'transformX'
                }>
                {children.map((child, i) =>
                    <motion.div
                        key={i}
                        initial={false}
                        variants={variantsItems}

                        className='w-full shrink-0'
                        transition={{

                            duration: 0.8,
                            ease: 'linear',
                            damping: 0
                        }}

                        animate={
                            elements.list[i]?.state === -1 ? 'left' :
                                elements.list[i]?.state === 0 ? 'center' :
                                    'right'
                        }>
                        <div>
                            {child}
                        </div>
                    </motion.div>)}
            </motion.div>
        </div >

    )
}

export default Carousel
