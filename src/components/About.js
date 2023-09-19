import MyImage from "./images/prof.jpg";
import {Anchor, Avatar, Container, Flex,  Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {
    IconBrandGithubFilled,
    IconBrandLinkedin, IconMail,
} from "@tabler/icons-react";




export default function About() {
    const avatarOf = (
            <Avatar variant="transparent" src={MyImage} radius="xl" size="xl" />
    )


    return (
        <Container my="md">
            <Flex
                mih={600}
                gap="xl"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
            >
            {avatarOf}
                <Text variant="gradient"
                gradient={{ from: 'red', to: 'cyan', deg: 90 }}
                ta="center"
                fz="xl">
                    Hello My name is Ferdavs Majitov
                </Text>

                    <Text align="center">
                    I'm Ferdavs Majitov, bachelor degree holder of BA and software developer
                        based in South Korea. At the moment I'm a searching a job as a junior software engineer,
                        and in my free-time I read a books, create personal projects. Mostly using
                        Java,
                        C#, JavaScript. And frameworks like: Springboot, Reactjs;
                    </Text>
                <Container>
                    <Anchor component={Link} to={"https://github.com/Ferchke7"}>
                        <IconBrandGithubFilled />
                    </Anchor>
                    <Anchor component={Link} to={"https://www.linkedin.com/in/ferdavsmajitov/"}>
                        <IconBrandLinkedin />
                    </Anchor>
                    <Anchor component={Link} to={"mailto:ferdavs@naver.com"}>
                        <IconMail />
                    </Anchor>
                </Container>
            </Flex>
        </Container>
        )
}