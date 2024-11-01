
import { Button, Card } from '@mui/material'
import React from 'react'
import _ from 'lodash'
import { tabButton } from '@/util/initial'

const TabComponent = ({ children, tab, setTab }) => {
    const isCheck = 'text-white bg-mainBg border-mainBg rounded-t-[8px] mr-[5px]'
    const isDefault = 'text-[#2A777F] bg-[#E0E7ED] border-[#E0E7ED] rounded-t-[8px] mr-[5px]'
    const handleClickButton = (code) => {
        setTab(code)
    }

    return (
        <div>
            <div className="flex">
                {
                    _.map(tabButton, (item) => (
                        <Button
                            key={item.id}
                            onClick={() => handleClickButton(item.code)}
                            className={tab === item.code ? isCheck : isDefault}
                        >
                            {_.get(item, 'text')}
                        </Button>
                    ))
                }
            </div>
            <Card>
                {children}
            </Card>
        </div>

    )
}

export default TabComponent
