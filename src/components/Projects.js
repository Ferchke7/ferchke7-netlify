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
            })
        console.log(projects)
    },[])


    const cards = projects.map((project) => (

        <Card key={project.description} p="md" radius="md" component="a" href={project.html_url} className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
                <Image src="https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg" />
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
        </Container>
    )
}
