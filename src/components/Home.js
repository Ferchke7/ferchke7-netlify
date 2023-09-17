import {BackgroundImage, List} from "@mantine/core";


export default function Home() {

    return (

        <BackgroundImage src="backgroundImage.jpg">

    <List>
        <List.Item>HOME</List.Item>
        <List.Item>Projects</List.Item>
        <List.Item>About Me</List.Item>
    </List>
        </BackgroundImage>
    )
}