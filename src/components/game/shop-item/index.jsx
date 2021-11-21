import React, { memo, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"


const ShopItem = memo(({itemIcon, item, addHandler, buyHandler}) => {
    const { t: translation } = useTranslation('shop')

    const productImageCanvas = useRef(null)

    useEffect(() => {
        const ctx = productImageCanvas.current.getContext('2d')

        for (const point of item.iconVirusPoints) {
            ctx.drawImage(itemIcon, point[0] * 20, point[1] * 20, 20, 20)
        }
    }, [])

    return (
        <div className="products-list__item products-list-item">
            <div className="products-list-item__wrapper">
                <div className="products-list-item__image-container">
                    <canvas
                        ref={productImageCanvas}
                        height={60}
                        width={60}
                    />
                </div>
                <div className="products-list-item__content">
                    <span className="products-list-item__title">
                        {translation(item.label)}
                        <i
                            className="products-list-item__add"
                            onClick={addHandler}
                        >
                            +
                        </i>
                    </span>

                    <div className="products-list-item__buy-info">
                        <span className="products-list-item__price">{item.price}$</span>
                        <button
                            className="products-list-item__buy-btn"
                            onClick={buyHandler}
                        >
                            Buy
                        </button>
                        <span className="products-list-item__gotten-qty">You have: {item.obtained}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ShopItem
