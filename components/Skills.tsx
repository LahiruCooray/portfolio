import {
    SiPython, SiCplusplus, SiFlask, SiSpring,
    SiDocker, SiKubernetes, SiTensorflow, SiPytorch,
    SiRos, SiArduino, SiPostgresql, SiGit, SiLinux,
    SiHelm
} from "react-icons/si";
import { Box, Brain, Layers } from "lucide-react";

const skills = [
    { name: "Python", icon: SiPython, color: "text-zinc-400 group-hover:text-yellow-500" },
    { name: "C/C++", icon: SiCplusplus, color: "text-zinc-400 group-hover:text-blue-500" },
    { name: "Gazebo", icon: Box, color: "text-zinc-400 group-hover:text-orange-500" },
    { name: "ROS2", icon: SiRos, color: "text-zinc-400 group-hover:text-zinc-100" },
    { name: "Gymnasium", icon: Brain, color: "text-zinc-400 group-hover:text-emerald-500" },
    { name: "Stable-Baselines3", icon: Layers, color: "text-zinc-400 group-hover:text-teal-500" },
    { name: "TensorFlow", icon: SiTensorflow, color: "text-zinc-400 group-hover:text-orange-500" },
    { name: "PyTorch", icon: SiPytorch, color: "text-zinc-400 group-hover:text-red-500" },
    { name: "Flask", icon: SiFlask, color: "text-zinc-400 group-hover:text-zinc-100" },
    { name: "Spring Boot", icon: SiSpring, color: "text-zinc-400 group-hover:text-green-600" },
    { name: "Docker", icon: SiDocker, color: "text-zinc-400 group-hover:text-blue-400" },
    { name: "Kubernetes", icon: SiKubernetes, color: "text-zinc-400 group-hover:text-blue-600" },
    { name: "Helm", icon: SiHelm, color: "text-zinc-400 group-hover:text-blue-500" },
    { name: "Arduino", icon: SiArduino, color: "text-zinc-400 group-hover:text-teal-500" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-zinc-400 group-hover:text-blue-700" },
    { name: "Git", icon: SiGit, color: "text-zinc-400 group-hover:text-orange-600" },
    { name: "Linux", icon: SiLinux, color: "text-zinc-400 group-hover:text-zinc-100" },
];

export default function Skills() {
    return (
        <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-xl font-bold mb-10 text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-sm">Technical Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="group flex flex-col items-start p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                        >
                            <skill.icon className={`w-6 h-6 mb-3 transition-colors duration-300 ${skill.color}`} />
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
