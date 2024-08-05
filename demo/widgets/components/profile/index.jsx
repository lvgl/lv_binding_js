import { View, Switch, Slider, Text, Image, Input, Dropdownlist, Button, Dimensions, BUILT_IN_SYMBOL, EAlignType, Mask, Calendar } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const { width, height } = Dimensions.window

const items = [
    'Male',
    'Female',
    'Other'
]

export default function App () {
    const ref = useRef()
    const [birthday, setBirthday] = useState('')
    const [showCalendar, setCalendarShow] = useState(false)

    return (
        <View style={style.profileWrapper}>
            <View style={style.panel1}>
                <Image style={style.panel1_avatar} src="./demo/widgets/assets/avatar.png" />
                <Text style={style.panel1_name}>Elena Smith</Text>
                <Text style={style.panel1_desc}>This is a short description of me. Take a look at my profile!</Text>
                <Text style={style.panel1_email_icon}>{BUILT_IN_SYMBOL.envelope}</Text>
                <Text style={style.panel1_email}>elena@smith.com</Text>
                <Text style={style.panel1_phone_icon}>{BUILT_IN_SYMBOL.call}</Text>
                <Text style={style.panel1_phone}>+79 246 123 4567</Text>
                <Button style={style.panel1_logout}>
                    <Text align={{
                        type: EAlignType.ALIGN_CENTER
                    }}>Log out</Text>
                </Button>
                <Button style={style.panel1_invite}>
                    <Text align={{
                        type: EAlignType.ALIGN_CENTER
                    }}>Invite</Text>
                </Button>
            </View>
            <View style={style.panel2}>
                <Text style={style.panel2_title}>Your profile</Text>
                <Text style={style.panel2_username}>User name</Text>
                <Input 
                    placeholder={'Your name'}
                    style={style.panel2_username_input}
                />
                <Text style={style.panel2_password}>Password</Text>
                <Input
                    placeholder={'Min. 8 chars.'}
                    mode="password"
                    style={style.panel2_password_input}
                />
                <Text style={style.panel2_gender}>Gender</Text>
                <Dropdownlist
                    items={items}
                    style={style.panel2_gender_dropdownlist}
                />
                <Text style={style.panel2_birthday}>Birthday</Text>
                <Input
                    style={style.panel2_birthday_input}
                    onFocus={() => {
                        setCalendarShow(true)
                    }}
                    value={birthday}
                    autoKeyBoard={false}
                />
                {showCalendar && <Mask
                    onClick={() => {
                        setCalendarShow(false)
                    }}
                >
                    <Calendar
                        today={"2022-10-1"}
                        style={style.calendar}
                        onChange={(e) => {
                            setBirthday(e.value)
                            setCalendarShow(false)
                        }}
                        align={{ 
                            type: EAlignType.ALIGN_CENTER
                        }}
                    />
                </Mask>}
            </View>
            <View style={style.panel3}>
                <Text style={style.panel3_title}>
                    Your skills
                </Text>
                <Text style={style.panel3_experience}>
                    Experience
                </Text>
                <Slider 
                    style={style.panel3_slider}
                />
                <Text style={style.panel3_team_player_title}>Team player</Text>
                <Switch style={style.panel3_teamplayer_switch} />
                <Text style={style.panel3_hard_working_title}>Hard-working</Text>
                <Switch style={style.panel3_hardworking_switch} />
            </View>
        </View>
    )
}

const style = {
    profileWrapper: {
        'display': 'grid',
        'grid-template-columns': '1fr 1fr',
        'grid-template-rows': 'auto auto',
        'width': '100%',
        'height': '100%',
    },
    panel1: {
        'width': '100%',
        'height': 'auto',
        'display': 'grid',
        'grid-template-columns': 'auto 5 auto 2fr 1fr 1fr',
        'grid-template-rows': 'auto auto 10 auto auto',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 2,
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    panel1_avatar: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'center',
        'align-self': 'center',
        'grid-row-pos': 0,
        'grid-row-span': 5,
    },
    panel1_name: {
        'grid-child': true,
        'grid-column-pos': 2,
        'grid-column-span': 2,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    panel1_desc: {
        'grid-child': true,
        'grid-column-pos': 2,
        'grid-column-span': 4,
        'justify-self': 'stretch',
        'align-self': 'start',
        'grid-row-pos': 1,
        'grid-row-span': 1,
    },
    panel1_email_icon: {
        'grid-child': true,
        'grid-column-pos': 2,
        'grid-column-span': 1,
        'justify-self': 'center',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 1,
        'font-size': '24px'
    },
    panel1_email: {
        'grid-child': true,
        'grid-column-pos': 3,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 1,
    },
    panel1_phone_icon: {
        'grid-child': true,
        'grid-column-pos': 2,
        'grid-column-span': 1,
        'justify-self': 'center',
        'align-self': 'center',
        'grid-row-pos': 4,
        'grid-row-span': 1,
        'font-size': '24px'
    },
    panel1_phone: {
        'grid-child': true,
        'grid-column-pos': 3,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 4,
        'grid-row-span': 1,
    },
    panel1_logout: {
        'grid-child': true,
        'grid-column-pos': 4,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 2,
    },
    panel1_invite: {
        'grid-child': true,
        'grid-column-pos': 5,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 2,
    },

    panel2: {
        'display': 'grid',
        'grid-template-columns': '1fr 1fr',
        'grid-template-rows': 'auto 5 auto 30 5 auto 30',

        'height': 'auto',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'start',
        'grid-row-pos': 1,
        'grid-row-span': 1,
    },
    panel2_title: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 2,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    panel2_username: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 2,
        'grid-row-span': 1,
    },
    panel2_username_input: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 1,
    },
    panel2_password: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 2,
        'grid-row-span': 1,
    },
    panel2_password_input: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 1,
    },
    panel2_gender: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 5,
        'grid-row-span': 1,
    },
    panel2_gender_dropdownlist: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'center',
        'grid-row-pos': 6,
        'grid-row-span': 1,
    },
    panel2_birthday: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 5,
        'grid-row-span': 1,
    },
    panel2_birthday_input: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'center',
        'grid-row-pos': 6,
        'grid-row-span': 1,
    },
    keyboard: {
        'left': 0,
        'top': height / 2,
        'height': height / 2,
        'width': '100%',
        'position': 'fixed'
    },
    panel3: {
        'display': 'grid',
        'grid-template-columns': '1fr 1fr',
        'grid-template-rows': 'auto 5 auto 30 5 auto 30',

        'height': 'auto',

        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'stretch',
        'grid-row-pos': 1,
        'grid-row-span': 1,
    },
    panel3_title: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 2,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    panel3_experience: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 2,
        'grid-row-span': 1,
    },
    panel3_slider: {
        'width': '95%',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 2,
        'justify-self': 'center',
        'align-self': 'center',
        'grid-row-pos': 3,
        'grid-row-span': 1,
    },
    panel3_team_player_title: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 5,
        'grid-row-span': 1,
    },
    panel3_teamplayer_switch: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 6,
        'grid-row-span': 1,
    },
    panel3_hard_working_title: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 5,
        'grid-row-span': 1,
    },
    panel3_hardworking_switch: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'center',
        'grid-row-pos': 6,
        'grid-row-span': 1,
    },
    calendar: {
        'width': 300,
        'height': 300
    }
}
