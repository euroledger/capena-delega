import React, { Component } from 'react';
import './button.css';
import etsyItems from './components/Fields/etsy';
import ebayItems from './components/Fields/ebay';
import uberItems from './components/Fields/uber';
import amazonItems from './components/Fields/amazon';
import facebookItems from './components/Fields/facebook';
import linkedinItems from './components/Fields/linkedin';
import stackoverflowItems from './components/Fields/stackoverflow';
import twitterItems from './components/Fields/twitter';
import upworkItems from './components/Fields/upwork';
import RegistrationDialog from './components/RegistrationDialog';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/TabPanel';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import QRcode from 'qrcode.react';
import crypto from 'crypto';
import ebayRoutes from './routes/ebay';
import etsyRoutes from './routes/etsy';
import uberRoutes from './routes/uber';
import signInRoutes from './routes/signInRoutes';

axios.defaults.baseURL = 'https://localhost:3002/';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const muiTheme = createMuiTheme({
    typography: {
        // "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontFamily": `"Lato","Arial","Helvetica","FreeSans","sans-serif"`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});
const initState = {
    user: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    etsyuser: {
        UserID: "",
        FeedbackCount: "",
        PositiveFeedbackPercent: "",
        RegistrationDate: "",
        CreationDate: ""
    },
    uberuser: {
        DriverID: "",
        Rating: "",
        ActivationStatus: "",
        TripCount: "",
        CreationDate: ""
    },
    amazonuser: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    facebookuser: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    linkedinuser: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    stackoverflowuser: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    twitteruser: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    upworkuser: {
        UserID: "",
        FeedbackScore: "",
        RegistrationDate: "",
        UniqueNegativeFeedbackCount: "",
        UniquePositiveFeedbackCount: "",
        PositiveFeedbackPercent: "",
        CreationDate: ""
    },
    qr_open: false,
    qr_hasClosed: false,
    qr_placeholder: "",
    invite_url: "",
    login_url: "",
    registering: false,
    loggingIn: false,
    ebay: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    etsy: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    uber: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    amazon: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    facebook: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    linkedin: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    stackoverflow: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    twitter: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    upwork: {
        qr_feedbackCollected: false,
        credential_accepted: true,
        verification_accepted: true,
        has_been_revoked: true,
        loading: false,
    },
    register: false,
    register_form_open: false,
    login: false,
    // login_form_open: false,
    firstname: '',
    lastname: '',
    email: '',
    connection_name: sessionStorage.getItem("name"),
    country: '',
    collapse_open: false,
    login_loading: false,
    userData: {},
    value: 0
};
export class App extends Component {

    constructor(props) {
        super(props);
        this.state = initState;
    }

    setCollapseClosed() {
        this.setState({
            collapse_open: false
        });
    }

    handleSubmit() {

        this.setState(prevState => ({
            etsy: { ...prevState.etsy, loading: true }
        }));
        setTimeout(() => {
            console.log("DONE!");

            this.setState(prevState => ({
                etsy: {
                    ...prevState.etsy,
                    qr_feedbackCollected: true,
                    loading: false
                },
                etsyuser: {
                    UserID: 'Spock',
                    FeedbackScore: '2019'
                }
            }));
        }, 3000);
    }

    onIssue = async () => {
        const ebayDSR = {
            name: this.state.user.UserID,
            feedbackscore: this.state.user.FeedbackScore.toString(),
            registrationdate: this.state.user.RegistrationDate,
            negfeedbackcount: this.state.user.UniqueNegativeFeedbackCount.toString(),
            posfeedbackcount: this.state.user.UniquePositiveFeedbackCount.toString(),
            posfeedbackpercent: this.state.user.PositiveFeedbackPercent.toString(),
            createdat: this.state.user.CreationDate.toString()
        }

        this.setState(prevState => ({
            ebay: { ...prevState.ebay, credential_accepted: false }
        }));

        await ebayRoutes.issue(ebayDSR);

        console.log("QUACK >>>>>>>>>>>>> we have done the ebay issue");

        this.setState(prevState => ({
            ebay: { ...prevState.ebay, credential_accepted: true, has_been_revoked: false }
        }));
        sessionStorage.setItem("selectedTab", 0);
    }

    onEtsyIssue = async () => {
        const etsyRatings = {
            name: this.state.etsyuser.UserID,
            feedbackcount: this.state.etsyuser.FeedbackCount.toString(),
            posfeedbackpercent: this.state.etsyuser.PositiveFeedbackPercent.toString(),
            registrationdate: this.state.etsyuser.RegistrationDate,
            createdat: this.state.user.CreationDate.toString()
        }

        this.setState(prevState => ({
            etsy: { ...prevState.etsy, credential_accepted: false }
        }));

        await etsyRoutes.issue(etsyRatings);
        console.log("CREDENTIAL ACCEPTED!!!");


        this.setState(prevState => ({
            etsy: { ...prevState.etsy, credential_accepted: true, has_been_revoked: false }
        }));
        sessionStorage.setItem("selectedTab", 1);
    }

    onUberIssue = async () => {
        const uberRatings = {
            driver: this.state.uberuser.DriverID,
            rating: this.state.uberuser.Rating.toString(),
            status: this.state.uberuser.ActivationStatus.toString(),
            tripcount: this.state.uberuser.TripCount,
            createdat: this.state.user.CreationDate.toString()
        }

        this.setState(prevState => ({
            uber: { ...prevState.uber, credential_accepted: false }
        }));

        console.log("ISSUING UBER CREDENTIALS: ", uberRatings);

        await uberRoutes.issue(uberRatings);

        this.setState(prevState => ({
            uber: { ...prevState.uber, credential_accepted: true, has_been_revoked: false }
        }));
        sessionStorage.setItem("selectedTab", "4");
    }

    onEbayRevoke = async () => {
        this.setState(prevState => ({
            ebay: { ...prevState.ebay, loading: true }
        }));
        console.log("Revoking EBAY credentials...");
        await ebayRoutes.revoke();

        // reset state back to initial state, clear the form and the saved ebay session data
        this.setState(prevState => ({
            ebay: { ...prevState.ebay, loading: false, has_been_revoked: true, qr_feedbackCollected: false },
            user: {
                UserID: "",
                FeedbackScore: "",
                RegistrationDate: "",
                UniqueNegativeFeedbackCount: "",
                UniquePositiveFeedbackCount: "",
                PositiveFeedbackPercent: "",
                CreationDate: ""
            }
        }));
        sessionStorage.setItem("ebayUserData", null);
    }

    onEtsyRevoke = async () => {
        this.setState(prevState => ({
            etsy: { ...prevState.etsy, loading: true }
        }));
        console.log("Revoking ETSY credentials...");
        await etsyRoutes.revoke();

        // reset state back to initial state, clear the form and the session data
        this.setState(prevState => ({
            etsy: { ...prevState.etsy, loading: false, has_been_revoked: true, qr_feedbackCollected: false },
            etsyuser: {
                UserID: "",
                FeedbackCount: "",
                PositiveFeedbackPercent: "",
                RegistrationDate: "",
                CreationDate: ""
            }
        }));
        sessionStorage.setItem("etsyUserData", null);

    }

    onUberRevoke = async () => {
        this.setState(prevState => ({
            uber: { ...prevState.uber, loading: true }
        }));
        console.log("Revoking UBER credentials...");

        await uberRoutes.revoke();

        // reset state back to initial state, clear the form and the session data
        this.setState(prevState => ({
            uber: { ...prevState.uber, loading: false, has_been_revoked: true, qr_feedbackCollected: false },
            uberuser: {
                DriverID: "",
                Rating: "",
                ActivationStatus: "",
                TripCount: "",
                CreationDate: ""
            }
        }));
        sessionStorage.setItem("uberUserData", null);

    }

    // onVerify = async () => {

    //     this.setState(prevState => ({
    //         ebay: { ...prevState.ebay, verification_accepted: false }
    //     }));
    //     console.log("Verifying credentials...");
    //     await axios.post('/api/sendkeyverification', null);
    //     await axios.get('/api/verification_accepted', null);

    //     this.setState(prevState => ({
    //         ebay: { ...prevState.ebay, verification_accepted: true, has_been_revoked: false }
    //     }));
    // }

    setEbayFieldValue = (event) => {
        const { target: { name, value } } = event;

        this.setState(prevState => ({
            user: {
                ...prevState.user, [name]: value
            }
        }));
    }

    setEtsyFieldValue = (event) => {
        const { target: { name, value } } = event;

        this.setState(prevState => ({
            etsyuser: {
                ...prevState.etsyuser, [name]: value
            }
        }));
    }

    loadEbayCredentials = (credentials) => {
        const ebayValues = credentials.filter(function (credential) {
            return credential.values.Platform === "ebay";
        });

        let ebayFields;
        let creationDate;
        if (ebayValues.length > 0) {
            ebayFields = ebayValues[ebayValues.length - 1].values;
            creationDate = ebayValues[ebayValues.length - 1].issuedAtUtc;
            var d = new Date(creationDate);
            // d.setMonth(d.getMonth() + 1);
            this.setState(prevState => ({
                ebay: {
                    ...prevState.ebay, qr_feedbackCollected: true,
                    credential_accepted: true, has_been_revoked: false,
                    loading: false
                },
                user: {
                    UserID: ebayFields["User Name"],
                    FeedbackScore: ebayFields["Feedback Score"],
                    RegistrationDate: ebayFields["Registration Date"],
                    UniqueNegativeFeedbackCount: ebayFields["Negative Feedback Count"],
                    UniquePositiveFeedbackCount: ebayFields["Positive Feedback Count"],
                    PositiveFeedbackPercent: ebayFields["Positive Feedback Percent"],
                    CreationDate: this.formatDate(d)
                }
            }));
            sessionStorage.setItem("waitingForEbayUserData", "false");
            // sessionStorage.setItem("ebayUserData", JSON.stringify(this.state.user));
            // sessionStorage.setItem("ebayStateData", JSON.stringify(this.state.ebay));
            sessionStorage.setItem("state", JSON.stringify(this.state));

        }
    }

    // load credentials from those previously issued 
    loadEtsyCredentials = (credentials) => {
        const etsyValues = credentials.filter(function (credential) {
            return credential.values.Platform === "etsy";
        });
        let etsyFields;
        let creationDate;
        if (etsyValues.length > 0) {
            etsyFields = etsyValues[etsyValues.length - 1].values;
            creationDate = etsyValues[etsyValues.length - 1].issuedAtUtc;
            var d = new Date(creationDate);
            // d.setMonth(d.getMonth() + 1);
            this.setState(prevState => ({
                etsy: {
                    ...prevState.etsy, qr_feedbackCollected: true,
                    credential_accepted: true, has_been_revoked: false,
                    loading: false
                },
                etsyuser: {
                    UserID: etsyFields["User Name"],
                    FeedbackCount: etsyFields["Feedback Count"],
                    RegistrationDate: etsyFields["Registration Date"],
                    PositiveFeedbackPercent: etsyFields["Positive Feedback Percent"],
                    CreationDate: this.formatDate(new Date(d))
                }
            }));
            sessionStorage.setItem("waitingForEtsyUserData", "false");
            // sessionStorage.setItem("etsyUserData", JSON.stringify(this.state.etsyuser));
            sessionStorage.setItem("state", JSON.stringify(this.state));
        }
    }

    // load credentials from those previously issued 
    loadUberCredentials = (credentials) => {
        const uberValues = credentials.filter(function (credential) {
            return credential.values.Platform === "uber";
        });
        let uberFields;
        let creationDate;
        if (uberValues.length > 0) {
            uberFields = uberValues[uberValues.length - 1].values;
            creationDate = uberValues[uberValues.length - 1].issuedAtUtc;
            var d = new Date(creationDate);
            // d.setMonth(d.getMonth() + 1);
            this.setState(prevState => ({
                uber: {
                    ...prevState.uber, qr_feedbackCollected: true,
                    credential_accepted: true, has_been_revoked: false,
                    loading: false
                },
                uberuser: {
                    DriverID: uberFields["Driver Name"],
                    Rating: uberFields["Driver Rating"],
                    ActivationStatus: uberFields["Activation Status"],
                    TripCount: uberFields["Trip Count"],
                    CreationDate: this.formatDate(new Date(d))
                }
            }));
            // sessionStorage.setItem("uberUserData", JSON.stringify(this.state.uberuser));
            sessionStorage.setItem("state", JSON.stringify(this.state));
        }
    }

    logout = async () => {
        // reset all forms, reset component state, 
        console.log("Logging out...");
        await signInRoutes.signout();
        console.log("Setting state back to init state")
        this.setState(initState);
        sessionStorage.setItem("state", null);
    }

    postLogin = async () => {
        this.setState({
            login_loading: true, loggingIn: true
        });
        let resp;
        try {
            resp = await signInRoutes.login();
        }
        catch (e) {
            console.log(e);
        }

        console.log("LOGIN ok! resp = ", resp);

        this.setState({
            login_loading: false,
            // login_form_open: false
        });
        // this.setState({ invite_url: "https://web.cloud.streetcred.id/link/?c_i=" + resp.data.login_request_url });

        this.setState({ invite_url: resp.data.login_request_url });

        this.setQRFormOpen(true);

        console.log("WAITING FOR LOGIN DATA...")

        const login = await signInRoutes.waitForLoginConfirmed();

        this.setQRFormOpen(false);

        if (login && login.status === 200) {
            console.log("Connection  = ", login.data);
            const name = login.data.connectionContract.name;

            console.log("QUACK >>> login name = ", name);
            this.setState({
                login: true, connection_name: name, register: true, loggingIn: false
            });
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("login", true);

            // push the credentials back in to the forms for the correct platforms
            this.loadEbayCredentials(login.data.credentials);
            this.loadEtsyCredentials(login.data.credentials);
            this.loadUberCredentials(login.data.credentials);
        } else {
            console.log("no connection found");
            this.setState({
                collapse_open: true
            });
        }
    }

    postRegister = async (form) => {
        // const passcode = Math.floor(Math.random() * 900000) + 100000;

        const passcode = crypto.randomBytes(20).toString('hex');

        const registrationInfo = {
            firstname: form.firstname,
            lastname: form.lastname,
            email: form.email,
            country: form.country,
            passcode: passcode
        }
        console.log(registrationInfo);
        const response = await signInRoutes.register(registrationInfo);
        console.log(response);

        this.setState({ invite_url: "https://web.cloud.streetcred.id/link/?c_i=" + response.data.invite_url });

        const resp = await signInRoutes.waitForConnection();

        this.setState(prevState => ({
            login: true,
            connection_name: resp.data,
            qr_open: false,
            ebay: { ...prevState.ebay, credential_accepted: false },
            etsy: { ...prevState.etsy, credential_accepted: false }
        }));
        sessionStorage.setItem("name", this.state.connection_name);
        sessionStorage.setItem("login", true);

        await signInRoutes.waitForCredentialAccepted();

        console.log("setting login to true");

        this.setState(prevState => ({
            qr_open: false,
            login: true,
            register: true,
            registering: false,
            ebay: { ...prevState.ebay, credential_accepted: true },
            etsy: { ...prevState.etsy, credential_accepted: true }
        }));
    }

    registerFormOpen = (open) => {
        this.setState({
            register_form_open: open,
            registering: true
        });
    }

    loginFormOpen = (open) => {
        this.setState({
            login_formi_open: open
        });
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1), // add 1 as January = 0
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    etsyGetUserData = async () => {
        console.log("Waiting for the (ETSY) feedback to arrive...");
        const user = await etsyRoutes.getFeedback();

        let count = user.data.feedback_info["count"];
        let score = user.data.feedback_info["score"];

        score = score === null ? 0 : score;
        console.log("User Data info = ", user.data.feedback_info["score"]);
        console.log("score = ", score);

        var d = new Date();
        d.setMonth(d.getMonth() + 1);

        this.setState(prevState => ({
            etsy: {
                ...prevState.etsy, qr_feedbackCollected: true,
                loading: false
            },
            etsyuser: {
                UserID: user.data.login_name,
                FeedbackCount: count,
                RegistrationDate: this.formatDate(new Date(user.data.creation_tsz * 1000)),
                PositiveFeedbackPercent: score,
                CreationDate: this.formatDate(d)
            }
        }));
        sessionStorage.setItem("waitingForEtsyUserData", "false");
        // sessionStorage.setItem("etsyUserData", JSON.stringify(this.state.etsyuser));
        sessionStorage.setItem("state", JSON.stringify(this.state));

        sessionStorage.setItem("selectedTab", "1");
        this.setState({ value: 1 });
    }

    ebayGetUserData = async () => {
        console.log("Waiting for the feedback to arrive...");
        const user = await ebayRoutes.getFeedback();

        console.log("User Data = ", user.data);

        var d = new Date();
        d.setMonth(d.getMonth() + 1);
        this.setState(prevState => ({
            ebay: {
                ...prevState.ebay, qr_feedbackCollected: true,
                loading: false
            },
            user: {
                UserID: user.data.UserID,
                FeedbackScore: user.data.FeedbackScore,
                RegistrationDate: user.data.RegistrationDate.substring(0, 10),
                UniqueNegativeFeedbackCount: user.data.UniqueNegativeFeedbackCount,
                UniquePositiveFeedbackCount: user.data.UniquePositiveFeedbackCount,
                PositiveFeedbackPercent: user.data.PositiveFeedbackPercent,
                CreationDate: this.formatDate(d)
            }
        }));

        window.stop();
        sessionStorage.setItem("waitingForEbayUserData", "false");
        // sessionStorage.setItem("ebayUserData", JSON.stringify(this.state.user));
        // sessionStorage.setItem("ebayStateData", JSON.stringify(this.state.ebay));
        sessionStorage.setItem("state", JSON.stringify(this.state));

        this.setState({ value: 0 });
    }
    
    etsyAuth = async () => {
        console.log("Going across to Etsy!...");
        let res;
        try {
            res = etsyRoutes.getAuthentication();
        } catch (e) {
            console.log(">>>>>>>>>>>>>> e = ", e);
        }
        console.log("----------------------------------------------------------- res.data = ", res);

        if (!res) {
            return;
        }
        console.log("res.data = ", res.data);
        sessionStorage.setItem("waitingForEtsyUserData", "true");

        window.location = res.data;

        this.etsyGetUserData();
    }

    etsyGetUserData = async () => {
        console.log("Waiting for the (ETSY) feedback to arrive...");
        const user = await axios.get('/api/etsy/feedback');

        let count = user.data.feedback_info["count"];
        let score = user.data.feedback_info["score"];

        score = score === null ? 0 : score;
        console.log("User Data info = ", user.data.feedback_info["score"]);
        console.log("score = ", score);

        var d = new Date();
        d.setMonth(d.getMonth() + 1);

        this.setState(prevState => ({
            etsy: {
                ...prevState.etsy, qr_feedbackCollected: true,
                loading: false
            },
            etsyuser: {
                UserID: user.data.login_name,
                FeedbackCount: count,
                RegistrationDate: this.formatDate(new Date(user.data.creation_tsz * 1000)),
                PositiveFeedbackPercent: score,
                CreationDate: this.formatDate(d)
            }
        }));
        sessionStorage.setItem("waitingForEtsyUserData", "false");
        // sessionStorage.setItem("etsyUserData", JSON.stringify(this.state.etsyuser));
        // sessionStorage.setItem("etsyStateData", JSON.stringify(this.state.etsy));
        // sessionStorage.setItem("ebayStateData", JSON.stringify(this.state.ebay));
        // sessionStorage.setItem("uberStateData", JSON.stringify(this.state.uber));
        sessionStorage.setItem("state", JSON.stringify(this.state));
        sessionStorage.setItem("selectedTab", "1");
        this.setState({ value: 1 });
    }

    etsyAuth = async () => {
        console.log("Going across to Etsy!...");
        let res = await etsyRoutes.getAuthentication();
        // try {
        //     // res = await axios.get('/auth/etsy');
        //     res 
        // } catch (e) {
        //     console.log(">>>>>>>>>>>>>> e = ", e);
        // }

        if (!res) {
            return;
        }
        console.log("res.data = ", res.data);
        sessionStorage.setItem("waitingForEtsyUserData", "true");

        window.location = res.data;

        this.etsyGetUserData();
    }

    ebayAuth = async () => {
        this.setState(prevState => ({
            ebay: { ...prevState.ebay, loading: true }
        }));

        console.log("Going across to eBay! This route returns the Url for sign-in to ebay");
        const res = await ebayRoutes.getAuthentication();

        sessionStorage.setItem("waitingForEbayUserData", "true");
        // switch to that URL
        window.location = res.data;

        this.ebayGetUserData();
    }

    onFeedback = () => {
        console.log("Getting eBay feedback...")
        this.ebayAuth();
    }

    onEtsyFeedback = () => {
        console.log("Getting Etsy feedback...")
        this.etsyAuth();
    }

    onAmazonFeedback = () => {
        console.log("Getting Amazon feedback...");
        this.setState(prevState => ({
            amazon: { ...prevState.amazon, loading: true }
        }));
        var d = new Date();
        d.setMonth(d.getMonth() + 1);
        setTimeout(() => {
            console.log("DONE!");

            this.setState(prevState => ({
                amazon: {
                    ...prevState.amazon,
                    qr_feedbackCollected: true,
                    loading: false
                },
                amazonuser: {
                    UserID: 'Alice Richardson',
                    FeedbackScore: "0",
                    RegistrationDate: "05-20-2018",
                    UniqueNegativeFeedbackCount: "0",
                    UniquePositiveFeedbackCount: "0",
                    PositiveFeedbackPercent: "0",
                    CreationDate: this.formatDate(d)
                }
            }));
        }, 3000);
        // this.etsyAuth();
    }

    onUberFeedback = () => {
        console.log("Getting Uber feedback...");
        this.setState(prevState => ({
            uber: { ...prevState.uber, loading: true }
        }));
        var d = new Date();
        d.setMonth(d.getMonth() + 1);
        setTimeout(() => {
            console.log("DONE!");

            this.setState(prevState => ({
                uber: {
                    ...prevState.amazon,
                    qr_feedbackCollected: true,
                    loading: false
                },
                uberuser: {
                    DriverID: 'Alice Richardson',
                    Rating: "4.87",
                    ActivationStatus: "Active",
                    TripCount: "19876",
                    CreationDate: this.formatDate(d)
                }
            }));
        }, 3000);
        // this.etsyAuth();
    }

    getLabel(platform) {
        if (!this.state[platform].qr_feedbackCollected) {
            return "Password";
        }
        else {
            return "Feedback Score";
        }
    }

    getInitialAcceptedLabel(platform) {
        return (this.state[platform].credential_accepted ? `Import User Reputation Data from ${platform}` : "Awaiting Acceptance...");
    }

    getAcceptedLabelRevoke(platform) {
        return (this.state[platform].credential_accepted ? "Revoke Credential" : "Awaiting Acceptance...");
    }

    getAcceptedLabelIssue(platform) {
        return (this.state[platform].credential_accepted ? "Issue Credential" : "Awaiting Acceptance...");
    }

    getAcceptedLabelVerify(platform) {
        return (this.state[platform].verification_accepted ? "Verify Credential" : "Awaiting Acceptance...");
    }

    getDisabled(platform) {
        return (!this.state[platform].credential_accepted);
    }

    getVerifyDisabled(platform) {
        return (this.state[platform].has_been_revoked || !(this.state[platform].verification_accepted));
    }

    etsybutton() {
        if (!this.state.etsy.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onEtsyFeedback()} disabled={this.getDisabled("etsy")}>
                {this.getInitialAcceptedLabel("etsy")}
            </Button>)
        } else if (!this.state.etsy.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("etsy")}
                onClick={() => this.onEtsyRevoke()}>
                {this.getAcceptedLabelRevoke("etsy")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("etsy")}
                onClick={() => this.onEtsyIssue()} >
                {this.getAcceptedLabelIssue("etsy")}
            </Button>)
        }

    }

    uberbutton() {
        if (!this.state.uber.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onUberFeedback()} disabled={this.getDisabled("uber")}>
                {this.getInitialAcceptedLabel("uber")}
            </Button>)
        } else if (!this.state.uber.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("uber")}
                onClick={() => this.onUberRevoke()}>
                {this.getAcceptedLabelRevoke("uber")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("uber")}
                onClick={() => this.onUberIssue()} >
                {this.getAcceptedLabelIssue("uber")}
            </Button>)
        }
    }

    amazonbutton() {
        if (!this.state.amazon.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onAmazonFeedback()} disabled={this.getDisabled("amazon")}>
                {this.getInitialAcceptedLabel("amazon")}
            </Button>)
        } else if (!this.state.amazon.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("amazon")}
                onClick={() => this.onAmazonRevoke()}>
                {this.getAcceptedLabelRevoke("amazon")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("amazon")}
                onClick={() => this.onAmazonIssue()} >
                {this.getAcceptedLabelIssue("amazon")}
            </Button>)
        }
    }

    upworkbutton() {
        if (!this.state.upwork.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onUpworkFeedback()} disabled={this.getDisabled("upwork")}>
                {this.getInitialAcceptedLabel("upwork")}
            </Button>)
        } else if (!this.state.upwork.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("upwork")}
                onClick={() => this.onUpworkRevoke()}>
                {this.getAcceptedLabelRevoke("upwork")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("upwork")}
                onClick={() => this.onUpworkIssue()} >
                {this.getAcceptedLabelIssue("upwork")}
            </Button>)
        }
    }
    twitterbutton() {
        if (!this.state.twitter.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onTwitterFeedback()} disabled={this.getDisabled("twitter")}>
                {this.getInitialAcceptedLabel("twitter")}
            </Button>)
        } else if (!this.state.twitter.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("twitter")}
                onClick={() => this.onTwitterRevoke()}>
                {this.getAcceptedLabelRevoke("twitter")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("twitter")}
                onClick={() => this.onTwitterIssue()} >
                {this.getAcceptedLabelIssue("twitter")}
            </Button>)
        }
    }

    stackoverflowbutton() {
        if (!this.state.stackoverflow.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onStackoverflowFeedback()} disabled={this.getDisabled("stackoverflow")}>
                {this.getInitialAcceptedLabel("stackoverflow")}
            </Button>)
        } else if (!this.state.stackoverflow.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("stackoverflow")}
                onClick={() => this.onStackoverflowRevoke()}>
                {this.getAcceptedLabelRevoke("stackoverflow")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("stackoverflow")}
                onClick={() => this.onStackoverflowIssue()} >
                {this.getAcceptedLabelIssue("stackoverflow")}
            </Button>)
        }
    }

    facebookbutton() {
        if (!this.state.facebook.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onFacebookFeedback()} disabled={this.getDisabled("facebook")}>
                {this.getInitialAcceptedLabel("facebook")}
            </Button>)
        } else if (!this.state.facebook.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("facebook")}
                onClick={() => this.onFacebookRevoke()}>
                {this.getAcceptedLabelRevoke("facebook")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("facebook")}
                onClick={() => this.onFacebookIssue()} >
                {this.getAcceptedLabelIssue("facebook")}
            </Button>)
        }
    }

    linkedinbutton() {
        if (!this.state.linkedin.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onLinkedinFeedback()} disabled={this.getDisabled("linkedin")}>
                {this.getInitialAcceptedLabel("linkedin")}
            </Button>)
        } else if (!this.state.linkedin.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("linkedin")}
                onClick={() => this.onLinkedinRevoke()}>
                {this.getAcceptedLabelRevoke("linkedin")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("linkedin")}
                onClick={() => this.onLinkedinIssue()} >
                {this.getAcceptedLabelIssue("linkedin")}
            </Button>)
        }
    }

    button() {
        console.log("EBAY button state...this.state.ebay.qr_feedbackCollected = ", this.state.ebay.qr_feedbackCollected);
        console.log("EBAY button state...this.state.ebay.has_been_revoked = ", this.state.ebay.has_been_revoked);
        if (!this.state.ebay.qr_feedbackCollected) {
            return (<Button className="registerbutton"
                onClick={() => this.onFeedback()} disabled={this.getDisabled("ebay")}>
                {this.getInitialAcceptedLabel("ebay")}
            </Button>)
        } else if (!this.state.ebay.has_been_revoked) {
            return (<Button className="revokebutton" disabled={this.getDisabled("ebay")}
                onClick={() => this.onEbayRevoke()}>
                {this.getAcceptedLabelRevoke("ebay")}
            </Button>)
        } else {
            return (<Button className="registerbutton" disabled={this.getDisabled("ebay")}
                onClick={() => this.onIssue()} >
                {this.getAcceptedLabelIssue("ebay")}
            </Button>)
        }

    }

    // ebaybutton() {
    //     return (<Button style={{ backgroundColor: '#e8624a', marginTop: '20px' }} disabled={this.getVerifyDisabled("ebay")}
    //         onClick={() => this.onVerify()}>
    //         {this.getAcceptedLabelVerify("ebay")}
    //     </Button>)
    // }
    // button2(platform) {
    //     return (<Button style={{ backgroundColor: '#e8624a', marginTop: '20px' }} disabled={this.getVerifyDisabled(platform)}
    //         onClick={() => this.onEtsyVerify()}>
    //         {this.getAcceptedLabelVerify("etsy")}
    //     </Button>)
    // }

    getQRCodeLabel() {
        return this.state.registering ? "Scan this QR code to Register with Capena" : "Scan this QR code to Login"
    }

    handleLoginClose() {
        this.setState({
            login_form_open: false
        });
    }

    startLoader() {
        this.setState({
            loading: true
        });
    }

    setQRFormOpen(open) {
        this.setState({
            qr_open: open
        });
    }

    reloadLoginDetails() {
        this.setState({ connection_name: sessionStorage.getItem("name") })
        const l = sessionStorage.getItem("login") === "true" ? true : false;
        if (l) {
            console.log(">>>>>>>>>>>>>>>>>>>>>> componentDidMount: set login to ", l);
            this.setState({ login: true })
        }
    }

    reloadEtsyUserDetails() {
        const state = JSON.parse(sessionStorage.getItem("state"));
        console.log("state = ", state);
        if (state) {
            this.setState(prevState => ({
                state: { ...prevState, state}
            }));
        }
    }

    reloadUberUserDetails() {
        const uber = JSON.parse(sessionStorage.getItem("uberUserData"));
        console.log("uber = ", uber);
        if (uber) {
            this.setState(prevState => ({
                uberuser: { ...prevState.uber, ...uber },
                uber: {
                    credential_accepted: true,
                    has_been_revoked: true,
                    qr_feedbackCollected: true,
                    loading: false
                }
            }));
        }
    }

    reloadEbayUserDetails() {
        const state = JSON.parse(sessionStorage.getItem("state"));
        console.log("state = ", state);
        if (state) {
            this.setState(prevState => ({
                state: { ...prevState, state}
            }));
        }
    }

    getLoginLabel() {
        return this.state.login ? "Sign Out" : "Login"
    }

    getRegisterLabel() {
        return this.state.register ? this.state.connection_name : "Register"
    }

    componentDidMount() {
        this.reloadLoginDetails();
        // this.reloadEtsyUserDetails();
        this.reloadEbayUserDetails();
        // this.reloadUberUserDetails();
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> TAB = ", sessionStorage.getItem("selectedTab"));
        if (sessionStorage.getItem("selectedTab")) {
            console.log("Setting selected tab to ", sessionStorage.getItem("selectedTab"))
            this.setState({ value: parseInt(sessionStorage.getItem("selectedTab")) })
        } else {
            console.log("No selected tab");
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    render() {

        let web = sessionStorage.getItem("waitingForEbayUserData");
        let wet = sessionStorage.getItem("waitingForEtsyUserData");
        if (web === "true") {
            this.ebayGetUserData();
        } else if (wet === "true") {
            this.etsyGetUserData();
        }
        const card = this.state;


        const a11yProps = (index) => {
            return {
                id: `simple-tab-${index}`,
                'aria-controls': `simple-tabpanel-${index}`,
            };
        }

        return (
            <ThemeProvider muiTheme={muiTheme}>
                <div >
                    <NavBar parent={this}></NavBar>
                    {/* The Paper */}
                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form
                            parent={this}
                            items={ebayItems}
                            loading={this.state.ebay.loading}
                            card={this.state.user}
                            title={"Create your eBay Credential"}
                            platform={"ebay"}>
                        </Form>
                        <Form
                            parent={this}
                            items={etsyItems}
                            loading={false}
                            card={this.state.etsyuser}
                            title={"Create your Etsy Credential"}
                            platform={"etsy"}>
                        </Form>
                    </div> */}
                    <Paper style={{
                        height: '800px',
                        backgroundImage: `url(${"hospital.jpg"})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundAttachment: "fixed",
                        flexGrow: 1
                    }}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            initialSelectedIndex="1"
                            centered
                        >

                            <Tab icon={<img style={{ height: '60px', width: '60px' }} alt="" src="ebay.png" />} {...a11yProps(0)} />
                            <Tab icon={<img style={{ height: '21px', width: '51px', marginTop: '-10px' }} alt="" src="etsy.png" />}{...a11yProps(1)} />
                            <Tab icon={<img style={{ height: '56px', width: '61px', marginTop: '-29px' }} alt="" src="upwork2.png" />} {...a11yProps(2)} />
                            <Tab icon={<img style={{ height: '73px', width: '60px' }} alt="" src="amazon3.png" />} {...a11yProps(3)} />
                            <Tab icon={<img style={{ height: '58px', width: '61px', marginTop: '-10px' }} alt="" src="uber2.png" />} {...a11yProps(4)} />

                            <Tab icon={<img style={{ height: '48px', width: '119px', marginTop: '-10px' }} alt="" src="facebook.png" />} {...a11yProps(5)} />

                            <Tab icon={<img style={{ height: '58px', width: '61px', marginTop: '-10px' }} alt="" src="linkedin.png" />} {...a11yProps(6)} />
                            <Tab icon={<img style={{ height: '32px', width: '79px', marginTop: '-19px' }} alt="" src="stackoverflow.png" />} {...a11yProps(7)} />
                            <Tab icon={<img style={{ height: '20px', width: '85px', marginTop: '-10px' }} alt="" src="twitter4.png" />} {...a11yProps(8)} />

                        </Tabs>
                        <TabPanel value={this.state.value} index={0}>
                            <Form
                                parent={this}
                                items={ebayItems}
                                loading={this.state.ebay.loading}
                                card={this.state.user}
                                title={"Create your eBay Credential"}
                                platform={"ebay"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                            <Form
                                parent={this}
                                items={etsyItems}
                                loading={this.state.ebay.loading}
                                card={this.state.etsyuser}
                                title={"Create your Etsy Credential"}
                                platform={"etsy"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Form
                                parent={this}
                                items={upworkItems}
                                loading={this.state.upwork.loading}
                                card={this.state.upworkuser}
                                title={"Create your Upwork Credential"}
                                platform={"upwork"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={3}>
                            <Form
                                parent={this}
                                items={amazonItems}
                                loading={this.state.amazon.loading}
                                card={this.state.amazonuser}
                                title={"Create your Amazon Credential"}
                                platform={"amazon"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={4}>
                            <Form
                                parent={this}
                                items={uberItems}
                                loading={this.state.uber.loading}
                                card={this.state.uberuser}
                                title={"Create your Uber Credential"}
                                platform={"uber"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={5}>
                            <Form
                                parent={this}
                                items={facebookItems}
                                loading={this.state.facebook.loading}
                                card={this.state.facebookuser}
                                title={"Create your Facebook Credential"}
                                platform={"facebook"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={6}>
                            <Form
                                parent={this}
                                items={linkedinItems}
                                loading={this.state.linkedin.loading}
                                card={this.state.linkedinuser}
                                title={"Create your LinkedIn Credential"}
                                platform={"linkedin"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={7}>
                            <Form
                                parent={this}
                                items={stackoverflowItems}
                                loading={this.state.stackoverflow.loading}
                                card={this.state.stackoverflowuser}
                                title={"Create your Stack Overflow Credential"}
                                platform={"stackoverflow"}>
                            </Form>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={8}>
                            <Form
                                parent={this}
                                items={twitterItems}
                                loading={this.state.twitter.loading}
                                card={this.state.twitteruser}
                                title={"Create your Twitter Credential"}
                                platform={"twitter"}>
                            </ Form>
                        </TabPanel>

                    </Paper>
                    {/* <LoginDialog
                        form_open={this.state.login_form_open}
                        parent={this}
                        collapse_open={this.state.collapse_open}
                        login_loading={this.state.login_loading}>
                    </LoginDialog> */}
                    <RegistrationDialog
                        form_open={this.state.register_form_open}
                        parent={this}>
                    </RegistrationDialog>
                    <Dialog open={this.state.qr_open} onClose={() => this.setState({ qr_open: false, qr_hasClosed: true })}>
                        <DialogTitle style={{ width: "300px" }}>{this.getQRCodeLabel()}</DialogTitle>
                        <QRcode size="200" value={this.state.invite_url} style={{ margin: "0 auto", padding: "10px" }} />
                    </Dialog>
                </div >
            </ThemeProvider >
        )
    }
}