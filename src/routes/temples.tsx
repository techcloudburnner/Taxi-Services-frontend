import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MoveRight } from "lucide-react";

// --- Image Imports ---
import harshParvatImg from "@/assets/temple-harsh-parvat.jpg";
import jeenMataImg from "@/assets/temple-jeen-mata.jpg";
import khatuImg from "@/assets/temple-khatu-shyam.jpg";
import salasarImg from "@/assets/temple-salasar.jpg";
import raniSatiImg from "@/assets/temple-rani-sati.jpg";
import laxmangarhImg from "@/assets/fort-laxmangarh.jpg";
import mandawaImg from "@/assets/haveli-mandawa.jpg";
import navalgarhImg from "@/assets/haveli-navalgrah.jpg";

export const Route = createFileRoute("/temples")({
    component: TemplesPage,
});

const templeList = [
    {
        name: "Harshnath Temple",
        location: "Sikar, Rajasthan",
        description: "An ancient temple dedicated to Lord Shiva, perched on a hill.",
        image: harshParvatImg,
        tag: "Ancient",
    },
    {
        name: "Jeenmata Temple",
        location: "Sikar, Rajasthan",
        description: "A revered shrine of Goddess Jeen Mata, attracting devotees year-round.",
        image: jeenMataImg,
        tag: "Pilgrimage",
    },
    {
        name: "Khatu Shyam Temple",
        location: "Khatu, Rajasthan",
        description: "A world-famous temple of Khatu Shyam Ji, a form of Lord Krishna.",
        image: khatuImg,
        tag: "Famous",
    },
    {
        name: "Salasar Balaji Temple",
        location: "Salasar, Rajasthan",
        description: "A significant temple for Hanuman devotees, known for its miracles.",
        image: salasarImg,
        tag: "Divine",
    },
    {
        name: "Rani Sati Mandir",
        location: "Jhunjhunu, Rajasthan",
        description: "A remarkable marble temple dedicated to Rani Sati, a symbol of bravery.",
        image: raniSatiImg,
        tag: "Historic",
    },
    {
        name: "Laxmangarh Fort",
        location: "Laxmangarh, Rajasthan",
        description: "A stunning fort on a rocky hill offering panoramic views of the town.",
        image: laxmangarhImg,
        tag: "Fortress",
    },
    {
        name: "Mandawa Havelis",
        location: "Mandawa, Rajasthan",
        description: "Explore the open-air art gallery of Rajasthan with ornate havelis.",
        image: mandawaImg,
        tag: "Art & Culture",
    },
    {
        name: "Navalgarh Havelis",
        location: "Navalgarh, Rajasthan",
        description: "Home to some of the finest frescoes and grand havelis in Shekhawati.",
        image: navalgarhImg,
        tag: "Heritage",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

function TemplesPage() {
    return (
        <div className="container-x pb-24">
            <PageHeader
                title="Temples & Havelis of Shekhawati"
                subtitle="Explore the rich heritage and divine destinations of the Shekhawati region with us. Book a taxi for a comfortable and memorable journey."
            />

            <motion.div
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {templeList.map((temple) => (
                    <motion.div key={temple.name} variants={itemVariants}>
                        <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <div className="relative">
                                <img
                                    src={temple.image}
                                    alt={temple.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge variant="destructive">{temple.tag}</Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">{temple.name}</CardTitle>
                                <CardDescription>{temple.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">
                                    {temple.description}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full group-hover:bg-brand-primary">
                                    <Link to="/booking">
                                        Book a Trip
                                        <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}