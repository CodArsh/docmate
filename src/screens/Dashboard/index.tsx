import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from 'rn-soft-headerbar'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'
import { recentUploads } from '../../config/constantsData';
import { useDispatch } from 'react-redux';
import { showLogoutModal } from '../../redux/slices/logoutSlice';
import ToastBox from 'react-native-simple-toast';
import { fetchFiles } from '../../api/fetchFilesService';

const Dashboard = () => {
    const dispatch = useDispatch()
    const [type, setTypes] = useState([])

    useEffect(() => {
        dashboardApi()
    }, [])

    const dashboardApi = async () => {
        try {
            const response = await fetchFiles()
            if (response.status === 200) {
                setTypes(response.data)
            }
        } catch (error) {
            ToastBox.show('Something went wrong', 5)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1ff' }}>
            <StatusBar backgroundColor={'#007AFF'} barStyle={'light-content'} />
            <HeaderBar title='Dashboard' backgroundColor='#007AFF' textColor='#fff' rightIcon={<Icon name="logout" size={22} color={'#fff'} />} onRightPress={() => dispatch(showLogoutModal())} />

            <View style={styles.filesOuter}>
                <Text style={styles.title}>Files</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        type?.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} key={index?.toString()} style={styles.container
                                }>
                                    <Text style={{ fontSize: 16, color: '#3e4a57ff', fontWeight: 'bold', textTransform: 'capitalize' }}>{item?._id}</Text>
                                    <Text style={{ fontSize: 15, color: '#3e4a57ff' }}>{item?.total}</Text>
                                    <Icon
                                        name={
                                            item?._id === 'image' ? 'image' :
                                                item?._id === 'audio' ? 'audiotrack' :
                                                    item?._id === 'video' ? 'videocam' :
                                                        'insert-drive-file'}
                                        size={65}
                                        color={item?._id === 'image' ? 'blue' : item?._id === 'video' ? 'orange' : item?._id === 'audio' ? 'green' : 'red'}
                                        style={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.2 }} />
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