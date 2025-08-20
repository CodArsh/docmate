import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import HeaderBar from 'rn-soft-headerbar'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'
import { fileTypes, recentUploads } from '../../config/constantsData';
import { useDispatch } from 'react-redux';
import { showLogoutModal } from '../../redux/slices/logoutSlice';
const Dashboard = () => {
    const dispatch = useDispatch()
    
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1ff' }}>
            <StatusBar backgroundColor={'#007AFF'} barStyle={'light-content'} />
            <HeaderBar title='Dashboard' backgroundColor='#007AFF' textColor='#fff' rightIcon={<Icon name="logout" size={22} color={'#fff'} />} onRightPress={() => dispatch(showLogoutModal())} />

            <View style={styles.filesOuter}>
                <Text style={styles.title}>Files</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        fileTypes?.map((item) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} key={item?.id?.toString()} style={[styles.container, {
                                    marginRight: item?.id === 1 || item?.id === 3 ? 15 : 0,

                                }]}>
                                    <Text style={{ fontSize: 17, color: '#3e4a57ff', fontWeight: 'bold' }}>{item?.title}</Text>
                                    <Text style={{ fontSize: 15, color: '#3e4a57ff' }}>{item?.files}</Text>
                                    <Icon name={item?.icon} size={65} color={item?.id === 1 ? 'green' : item?.id === 2 ? 'orange' : item?.id === 3 ? 'blue' : 'red'} style={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.2 }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

            <View style={styles.filesOuter}>
                <Text style={styles.title}>Recent uploads</Text>
                {
                    recentUploads?.map((item) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} key={item?.id?.toString()} >
                                <View style={styles.recentContainer}>
                                    <Text style={{ color: '#3e4a57ff' }}>{item?.contentName}</Text>
                                    <Text style={{ color: '#3e4a57ff' }}>{item?.size}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
        </View>
    )
}

export default Dashboard