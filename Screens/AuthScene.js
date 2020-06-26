import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Form, Item, Input, Body, Text, CheckBox, Button } from 'native-base';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';
import * as Font from 'expo-font';

let customFonts = {
    'GoogleSans-Bold': require('../assets/fonts/GoogleSans-Bold.ttf'),
    'GoogleSans-Medium': require('../assets/fonts/GoogleSans-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
};
class AuthScene extends Component {
    state = {
        fontsLoaded: false,
        username: "",
        password: "",
        patientcheckbox: true,
        doctorcheckbox: false
    };

    sendCred = async (props) => {
        if (this.state.doctorcheckbox == true) {
            fetch("https://mdfollowupauth.azurewebsites.net/api/Login/Provider", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userID": this.state.username,
                    "password": this.state.password
                })
            })
                .then(res => res.json())
                .then(async (data) => {
                    // Alert.alert("patient done")
                         await AsyncStorage.setItem('token',data.token)
                         props.navigation.replace("HomeScreen")
                })
                .catch(error => Alert.alert('Doctor error'))

        }
        if (this.state.patientcheckbox == true) {
            fetch("https://mdfollowupauth.azurewebsites.net/api/Login/Patient", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userID": this.state.username,
                    "password": this.state.password
                })
            })
                .then(res => res.json())
                .then(async (data) => {
                    await AsyncStorage.setItem('token',data.token)
                    this.props.navigation.navigate("Home")
                })
                .catch( async error => {console.log('Patient error')});

        }
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }
    render() {
        if (this.state.fontsLoaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.top}></View>

                    <View style={styles.middle}>
                        <Text style={styles.textContainer}>Welcome!</Text>

                        <View style={styles.formArea}>
                            <Text style={[styles.textContainer, styles.signin]}>Sign in</Text>
                            <Form style={styles.mainForm}>
                                <Item style={styles.formItems}>
                                    <Input placeholder="Username" style={styles.Input} onChangeText={text => this.setState({ username: text })} />
                                </Item>
                                <Item style={styles.formItems}>
                                    <Input secureTextEntry placeholder="Password" style={styles.Input} onChangeText={text => this.setState({ password: text })} />
                                </Item>

                                <View style={styles.loginAs}>
                                    <Text style={styles.loginText}>Login as</Text>
                                    <CheckBox checked={this.state.patientcheckbox} onPress={() => this.setState({ patientcheckbox: !this.state.patientcheckbox, doctorcheckbox: !this.state.doctorcheckbox })} />
                                    <Body>
                                    <Text style={styles.cboxText}>Patient</Text>
                                    </Body>
                                    <CheckBox checked={this.state.doctorcheckbox} onPress={() => this.setState({ doctorcheckbox: !this.state.doctorcheckbox, patientcheckbox: !this.state.patientcheckbox })} />
                                    <Body>
                                    <Text style={styles.cboxText}>Doctor</Text>
                                    </Body>
                                </View>
                                <View style={styles.Button}>
                                    <Button block style={styles.mainBtn} onPress={() => this.sendCred()}>
                                        <Text style={styles.btnText}>Login</Text>
                                    </Button>
                                </View>
                            </Form>
                        </View>
                    </View>
                    <View style={styles.bottom}></View>
                </View>
            );
        } else {
            return <AppLoading />;
        }
    }
}

export default AuthScene;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    top: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        paddingRight: 12.7,
        paddingLeft: 12.7,
        height: 250,
    },
    middle: {
        width: '100%',
        height: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'transparent',
        paddingLeft: 26.3,
        paddingRight: 26.3,
    },
    bottom: {
        position: 'relative',
        height: '100%',
        paddingRight: 12.7,
        paddingLeft: 12.7,
        backgroundColor: '#FFFFFF',
    },
    textContainer: {
        color: '#2D3057',
        fontFamily: 'GoogleSans-Bold',
        fontSize: 24,
        marginBottom: 30,
        position: 'relative',
        top: '20%',
        alignSelf: 'center',
    },
    formArea: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        top: '20%',
        paddingBottom: 40,
    },
    signin: {
        top: 0,
        color: '#2D3057',
        marginTop: 15,
    },
    formItems: {
        marginTop: 15,
        borderBottomColor: '#2D3057',
    },
    Input: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    loginAs: {
        paddingLeft: 46.6,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#2D3057',
        fontSize: 10,
        fontFamily: 'GoogleSans-Bold',
        fontWeight: 'bold',
    },
    cboxText: {
        fontFamily: 'GoogleSans-Medium',
        fontSize: 10,
    },
    Button: {
        padding: 30.8,
        borderRadius: 4,
    },
    mainBtn: {
        backgroundColor: '#1DDCAF',
    },
    btnText: {
        color: '#2D3057',
        fontFamily: 'GoogleSans-Medium',
        fontSize: 12,
    },
});