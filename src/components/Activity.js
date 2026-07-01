import {
    Badge,
    Button,
    Card,
    Container,
    Group,
    Loader,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";
import {
    IconBrandGithub,
    IconCalendar,
    IconExternalLink,
    IconFolderCode,
    IconGitFork,
    IconMessages,
    IconStar,
    IconWorld,
} from '@tabler/icons-react';
import { resumeProfile } from "../shared/data/resumeProfile";
import { useGithubActivity } from "../shared/hooks/useGithubActivity";

function formatDate(dateValue) {
    return new Date(dateValue).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getRepoInitials(name) {
    return name
        .split(/[-_\s]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function RepoCard({ project, featured = false }) {
    const hasSite = Boolean(project.siteUrl);

    return (
        <Card p="md" radius="md" className={featured ? "activity-card activity-card-featured" : "activity-card"}>
            <div className="project-visual">
                <div className="project-visual-grid">
                    <span>{getRepoInitials(project.name)}</span>
                    <em>{project.language || "GitHub"}</em>
                </div>
            </div>

            <div className="activity-card-body">
                <Group position="apart" align="flex-start" noWrap>
                    <div>
                        <Group spacing={6}>
                            {hasSite ? <IconWorld size={18} /> : <IconBrandGithub size={18} />}
                            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                                {hasSite ? "Live public work" : "GitHub signal"}
                            </Text>
                        </Group>
                        <Title order={3} className="activity-title">{project.name}</Title>
                    </div>
                    <Badge className="activity-rank">{featured ? "Featured" : "Recent"}</Badge>
                </Group>

                <Text className="activity-description" mt="sm">
                    {project.description}
                </Text>

                <div className="project-signal-grid">
                    <div>
                        <span>Updated</span>
                        <strong>{formatDate(project.pushed_at)}</strong>
                    </div>
                    <div>
                        <span>Stars</span>
                        <strong>{project.stargazers_count || 0}</strong>
                    </div>
                    <div>
                        <span>Forks</span>
                        <strong>{project.forks_count || 0}</strong>
                    </div>
                </div>

                <Group spacing="xs" mt="md" className="project-meta-row">
                    {project.language && <Badge variant="outline" color="cyan">{project.language}</Badge>}
                    <Badge variant="outline" color="gray" leftSection={<IconCalendar size={12} />}>
                        {formatDate(project.pushed_at)}
                    </Badge>
                    <Badge variant="outline" color="yellow" leftSection={<IconStar size={12} />}>
                        {project.stargazers_count || 0}
                    </Badge>
                    <Badge variant="outline" color="violet" leftSection={<IconGitFork size={12} />}>
                        {project.forks_count || 0}
                    </Badge>
                </Group>

                <Group spacing="sm" mt="lg" className="project-actions">
                    {hasSite && (
                        <Button component="a" href={project.siteUrl} target="_blank" rel="noreferrer" className="project-action-primary" leftIcon={<IconWorld size={16} />}>
                            Live demo
                        </Button>
                    )}
                    <Button component="a" href={project.html_url} target="_blank" rel="noreferrer" variant="outline" className="project-action-secondary" leftIcon={<IconBrandGithub size={16} />} rightIcon={<IconExternalLink size={15} />}>
                        Source
                    </Button>
                </Group>
            </div>
        </Card>
    );
}

export default function Activity() {
    const { describedRepositories: projects, error, isLoading, liveSites, stats } = useGithubActivity();
    const liveSiteIds = new Set(liveSites.map((project) => project.id));
    const featuredItems = [...liveSites, ...projects.filter((project) => !liveSiteIds.has(project.id))].slice(0, 3);
    const remainingItems = projects.filter((project) => !featuredItems.some((featured) => featured.id === project.id));

    return (
        <Container size="lg" py="xl">
            <section className="projects-header projects-hero">
                <Badge className="status-badge" leftSection={<IconFolderCode size={14} />}>
                    Engineering activity
                </Badge>
                <Title order={1}>Public work, open-source, and technical writing signals</Title>
                <Text>
                    A cleaner activity page powered by GitHub API data, with LinkedIn-facing topics for the things I write and talk about.
                </Text>
            </section>

            {error && (
                <div className="api-warning">
                    <Text>GitHub API is partially unavailable. Some activity metrics may be missing.</Text>
                </div>
            )}

            {isLoading ? (
                <div className="loading-state">
                    <Loader color="cyan" />
                    <Text color="dimmed">Loading public activity...</Text>
                </div>
            ) : (
                <>
                    <section className="project-dashboard-strip">
                        <article>
                            <Text>Repos</Text>
                            <strong>{stats.describedProjects}</strong>
                        </article>
                        <article>
                            <Text>Live links</Text>
                            <strong>{stats.liveSites}</strong>
                        </article>
                        <article>
                            <Text>Stars</Text>
                            <strong>{stats.stars}</strong>
                        </article>
                        <article>
                            <Text>Forks</Text>
                            <strong>{stats.forks}</strong>
                        </article>
                    </section>

                    <section className="section-block project-section-tight">
                        <div className="section-heading">
                            <Badge variant="outline" color="cyan" leftSection={<IconWorld size={14} />}>
                                Featured activity
                            </Badge>
                            <Title order={2}>Best public entry points</Title>
                        </div>

                        {featuredItems.length ? (
                            <SimpleGrid cols={1} spacing="lg">
                                {featuredItems.map((project) => (
                                    <RepoCard project={project} featured key={project.id} />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <div className="empty-state">
                                <Text>No featured public links detected yet.</Text>
                            </div>
                        )}
                    </section>

                    <section className="section-block project-section-tight">
                        <div className="section-heading">
                            <Badge variant="outline" color="pink" leftSection={<IconMessages size={14} />}>
                                LinkedIn topics
                            </Badge>
                            <Title order={2}>What I can turn into posts</Title>
                        </div>

                        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]} spacing="lg">
                            {resumeProfile.thoughtTopics.map((topic) => (
                                <article className="thought-card" key={topic.title}>
                                    <IconMessages size={24} />
                                    <Title order={3}>{topic.title}</Title>
                                    <Text>{topic.text}</Text>
                                    <Button component="a" href={resumeProfile.linkedin} target="_blank" rel="noreferrer" variant="outline" className="project-action-secondary" rightIcon={<IconExternalLink size={15} />}>
                                        LinkedIn profile
                                    </Button>
                                </article>
                            ))}
                        </SimpleGrid>
                    </section>

                    <section className="section-block project-section-tight">
                        <div className="section-heading">
                            <Badge variant="outline" color="violet" leftSection={<IconBrandGithub size={14} />}>
                                More public work
                            </Badge>
                            <Title order={2}>Recent GitHub activity</Title>
                        </div>

                        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing="lg">
                            {remainingItems.map((project) => (
                                <RepoCard project={project} key={project.id} />
                            ))}
                        </SimpleGrid>
                    </section>
                </>
            )}
        </Container>
    )
}
