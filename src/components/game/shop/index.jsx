import React, { memo, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import io from "@api/web-socket"
import {
    fetchShopProducts as fetchShopProductsApi,
    shopTransaction as shopTransactionApi
} from "@api/web-socket-api"
import ShopItem from "@components/game/shop-item"
import "./shop.scss"

const Shop = memo(({shopHidden, hideShop}) => {
    const gameObject = useSelector(({game}) => game.gameObject)

    const [moneyAmount, setMoneyAmount] = useState(0)
    const [shopUnits, setShopProducts] = useState(null)

    const playersVirus = useRef(null)

    const thisPlayer = useSelector(({game}) => {
        const thisPlayerId = game.currentGameRoom.myId

        return game.currentGameRoom.connectedPlayers[thisPlayerId]
    })

    useEffect(() => {
        const image = new Image()
        image.src = thisPlayer.playersVirus

        image.onload = () => playersVirus.current = image
    }, [])

    useEffect(() => {
        io.on('player:moneyUpdate', (newMoneyAmount) => {
            setMoneyAmount(newMoneyAmount)
        })
    })

    useEffect(async () => {
        if (shopHidden) return

        const newShopUnits = await fetchShopProductsApi()

        setShopProducts(newShopUnits)
    })

    return (
        <div
            className={'game-modal game-shop ' + (shopHidden ? '' : 'game-shop--show')}
        >
            <div className="game-shop__wrapper">
                <span
                    className="game-shop__money-amount"
                >
                    You have: 
                    <i className="emphasis">{moneyAmount}$</i>
                </span>
                <div className="game-shop__products-list products-list">
                    {(shopUnits && playersVirus.current) ?
                        Object.keys(shopUnits).map((unitId) =>
                            <ShopItem
                                itemIcon={playersVirus.current}
                                item={shopUnits[unitId]}
                                addHandler={() => addUnitHandler(unitId)}
                                buyHandler={() => buyUnitHandler(unitId)}
                            />
                        )
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    )

    async function buyUnitHandler(unitId) {
        const success = await shopTransactionApi({unitId})

        if (success) {
            // will fetch on rerender
            setShopProducts(null)
        }
    }

    function addUnitHandler(unitId) {
        if (shopUnits[unitId].obtained > 0) {
            hideShop()

            setTimeout(() => gameObject.placeUnitMode(unitId, shopUnits[unitId].iconVirusPoints.length))
        }
    }
})

export default Shop
