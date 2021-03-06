import React, { Component } from 'react';
import {
	StyleSheet,
	SectionList,
	Text,
	View,
	Modal,
	TouchableHighlight,
	AsyncStorage,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput
} from "react-native";
import { Container, Header, Text as Textbase, Left, Icon as IconMenu } from "native-base";
import SurveyListThumbnails from "./SurveyListThumbnails";
import { Col, Row, Grid } from "react-native-easy-grid";

const ip = require("../ip.json");

export default class Search extends Component {
	static navigationOptions = {
		drawerIcon: () => (
			<IconMenu name='search' style={{ fontSize: 27 }} />
		)
	};

	constructor(props) {
		super(props);
		this.state = {
			text: "init",
			data: [],
			modalVisible: false,
			selectedSurvey: null,
			images: [
				require("./assets/1.jpeg"),
				require("./assets/2.jpeg"),
				require("./assets/3.jpeg"),
				require("./assets/4.jpeg"),
				require("./assets/5.jpeg"),
				require("./assets/6.jpeg"),
				require("./assets/7.jpeg"),
				require("./assets/8.jpeg"),
				require("./assets/9.jpeg"),
				require("./assets/10.jpg")
			]
		};
	}

	setModalVisible = visible => {
		this.setState({ modalVisible: visible });
	};

	selectedSurvey = item => {
		this.setState({ selectedSurvey: item });
	};

	onSearch() {
		fetch(`${ip}:3000/search/`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: this.state.text })
		})
			.then((response) => { return response.json() })
			.then((res) => {
				// clear inputTexts
				this.textInput.clear()

				this.setState({
					data: res.results
				})
			}).done()

	}

	render() {
		let output;
		let init = "Search for survey name";
		if (this.state.data.length > 0) {
			output = this.state.data
			init = ""
		}
		return (
			<View style={styles.container}>
				<Header style={{ backgroundColor: "#037FBC" }}>
					<Left>
						<IconMenu style={styles.icon} name='menu' onPress={() => { this.props.navigation.openDrawer() }} />
					</Left>
					<Text style={styles.headerStyle}>Search</Text>
				</Header>

				<View style={styles.inner}>
					<TextInput
						placeholderTextColor='grey'
						style={styles.TextInput}
						editable={true}
						maxLength={40}
						numberOfLines={4}
						ref={input => { this.textInput = input }}
						onChangeText={(text) => this.setState({ text })}
						placeholder=" Search"
					/>
					<IconMenu style={styles.button} name='search' onPress={this.onSearch.bind(this)} />
				</View>
				<View>
					<Text style={{ marginTop: 15, marginLeft: 10 }}>{init}</Text>
					<ScrollView>
						<Grid>
							<Row size={2}>
								<SurveyListThumbnails
									allSurveys={output}
									selectedSurvey={this.selectedSurvey.bind(this)}
									showHandler={this.setModalVisible.bind(this)}
									surveyImages={this.state.images}
								/>
							</Row>
						</Grid>
					</ScrollView>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		backgroundColor: 'white'
	},
	inner: {
		position: 'relative',
		borderStyle: 'solid',
		justifyContent: 'space-between',
		flexDirection: 'row',
		top: 13,
		height: 45,
		marginLeft: 10,
	},
	text: {
		fontSize: 25
	},
	TextInput: {
		height: 40,
		flex: 0.9,
		borderWidth: 1,
		borderColor: '#002C43',
		backgroundColor: "white",
		color: 'black',
		marginLeft: 5,
	},
	button: {
		marginLeft: -28,
		marginRight: 12,
		marginTop: 5,
		color: "#002C43",
	},
	icon: {
		color: "white",
		margin: 10,
		fontSize: 40,
		textAlign: "left"
	},
	headerStyle: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlignVertical: "center",
		textAlign: "left",
		color: "white",
		fontSize: 22
	},
}); 