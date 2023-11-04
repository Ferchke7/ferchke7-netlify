import {
    Card,
    Image,
    Text,
    SimpleGrid,
    createStyles,
    AspectRatio, Container
} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconBrandGithub} from '@tabler/icons-react';
const useStyles = createStyles((theme) => ({
    card: {
        transition: 'transform 150ms ease, box-shadow 150ms ease',

        '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: theme.shadows.md,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 600,
    },
}));
export default function Project() {
    const [projects, setProjects] = useState([]);
    const [numOfStats, setNumOfStats] = useState(0);
    const { classes } = useStyles();
    useEffect(() => {
        fetch("https://api.github.com/users/Ferchke7/repos")
            .then((response) => response.json())
            .then(data => {
                const pWithD = data.filter(project => project.description);
                const sortedProjects = pWithD.sort((a, b) => {
                    const dateA = new Date(a.pushed_at);
                    const dateB = new Date(b.pushed_at);

                    return dateB - dateA;
                });
                setProjects(sortedProjects)
                setNumOfStats(sortedProjects.length)
            })

    },[projects])

    const numProjects = (
        <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body">
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
               Number of completed projects {numOfStats}
            </Text>
        </Card>
    )
    const cards = projects.map((project) => (

        <Card key={project.description} p="md" radius="md" component="a" href={project.html_url} className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
                <Image src="https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg" />
            </AspectRatio>
            <IconBrandGithub />
            <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                {project.name}
            </Text>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                {new Date(project.created_at).toLocaleDateString()}
            </Text>
            <Text className={classes.description} mt={5}>
                {project.description}
            </Text>

        </Card>
    ));
    return (


        <Container py="xl">
            <Text size="xl">#PROJECTS</Text>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                {cards}
            </SimpleGrid>
            {numProjects}
        </Container>
    )
}
