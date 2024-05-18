"use client"
import { useState } from 'react';
import OpenAI from "openai";
import Card from '@/components/card';

type Experience = {
  title: string;
  location: string;
  company: string;
  dates: string;
  description: string;
};

type Education = {
  course: string;
  university: string;
  dates: string;
  description: string;
  location: string;
};

type Certification = {
  title: string;
  organization: string;
  dates: string;
  description: string;
};

type LinkedInProfile = {
  name: string;
  heading: string;
  about: string;
  experience: Experience[];
  education: Education[];
  certification: Certification[];
  skills: string[];
  languages: string[];
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [cvText, setCvText] = useState<string>('');
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [streaming, setStreaming] = useState<boolean>(false);

  /**
   * Handles the generation of a LinkedIn profile based on a given CV/resume text.
   * @returns {void}
   */
  const handleGenerateProfile = async () => {
    setLoading(true);
    setStreaming(true);
    setProfile({
      name: '',
      heading: '',
      about: '',
      experience: [],
      education: [],
      certification: [],
      skills: [],
      languages: []
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful professional resume/cv assistant." },
          {
            role: "user", content: `
          Based on the following CV/resume text, create a LinkedIn profile with a heading, optimized about section, optimized experience section, certification(courses) section, award section, language section, and skills section:\n\n

          Use one of the following templates to get the best results:\n\n
          -I am a [job title], and I help [your clients] to achieve [dream outcome].
          -I am a [job title] at [company]. Driving [impact/change] in [industry/field].
          -I am [job title], delivering [solution/benefit] to [target audience/industry].
          -I am a [job title] at [company], specializing in [skills/industry].


          ${cvText}\n\n

          The output should be in the following JSON format:\n
          {
            "name": "Profile Name",
            "heading": "Profile Heading",
            "about": "About section content",
            "experience": [
              {
                "title": "Job Title",
                "location": "Job Location",
                "company": "Company Name",
                "dates": "Employment Dates",
                "description": "Job Description"
              },
              ...
            ],
            "education": [
              {
                "course": "Course Name",
                "university": "University Name",
                "dates": "Dates",
                "description": "Description",
              },
              ...
            ],
            "certification": [
              {
                "title": "Certification Title",
                "organization": "Organization Name",
                "dates": "Certification Dates",
                "description": "Certification Description",
              },
              ...
            ],
            "skills": ["Skill 1", "Skill 2", ...],
            "languages": ["Language 1", "Language 2", ...]
          }` },
        ],
      });

      const responseData = completion.choices[0].message?.content || '';

      if (!responseData) {
        setLoading(false);
        setStreaming(false);
      }

      const parsedData: LinkedInProfile = JSON.parse(responseData);

      // Simulate streaming effect
      const simulateStreaming = (parsedData: LinkedInProfile) => {
        let timeout = 100;

        setTimeout(() => {
          setProfile((prev) => ({
            ...prev,
            name: parsedData.name,
            heading: parsedData.heading,
          } as LinkedInProfile));
        }, timeout);

        timeout += 100;

        setTimeout(() => {
          setProfile((prev) => ({
            ...prev,
            about: parsedData.about,
          } as LinkedInProfile));
        }, timeout);

        timeout += 100;

        parsedData.experience.forEach((exp, index) => {
          setTimeout(() => {
            setProfile((prev) => ({
              ...prev,
              experience: [...(prev?.experience || []), exp],
            } as LinkedInProfile));
          }, timeout + index * 100);
        });

        timeout += parsedData.experience.length * 100;

        parsedData.education.forEach((edu, index) => {
          setTimeout(() => {
            setProfile((prev) => ({
              ...prev,
              education: [...(prev?.education || []), edu],
            } as LinkedInProfile));
          }, timeout + index * 100);
        });

        timeout += parsedData.education.length * 100;

        parsedData.certification.forEach((cert, index) => {
          setTimeout(() => {
            setProfile((prev) => ({
              ...prev,
              certification: [...(prev?.certification || []), cert],
            } as LinkedInProfile));
          }, timeout + index * 100);
        });

        timeout += parsedData.certification.length * 100;

        parsedData.skills.forEach((skill, index) => {
          setTimeout(() => {
            setProfile((prev) => ({
              ...prev,
              skills: [...(prev?.skills || []), skill],
            } as LinkedInProfile));
          }, timeout + index * 100);
        });

        setTimeout(() => {
          setLoading(false);
          setStreaming(false);
        }, timeout + parsedData.skills.length * 100);

        parsedData.languages.forEach((lang, index) => {
          setTimeout(() => {
            setProfile((prev) => ({
              ...prev,
              languages: [...(prev?.languages || []), lang],
            } as LinkedInProfile));
          }, timeout + index * 100);
        });

        setTimeout(() => {
          setLoading(false);
          setStreaming(false);
        }, timeout + parsedData.languages.length * 100);
      };

      simulateStreaming(parsedData);

    } catch (error) {

      setLoading(false);
      setStreaming(false);
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LinkedIn Profile Generator</h1>
      <textarea
        className="w-full p-2 border rounded mb-4 text-gray-900"
        rows={10}
        placeholder="Paste your CV/resume text here..."
        value={cvText}
        onChange={(e) => setCvText(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleGenerateProfile}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate LinkedIn Profile'}
      </button>

      {loading && (
        <div className="mt-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <span className="ml-2">Generating profile...</span>
        </div>
      )}

      {profile && !loading && (
        <div className="mt-8 ">
          <Card classname="relative px-0 py-0">
            <div className='h-[201px] profile-background-image--default bg-white py-4 rounded-t '>
            </div>

            <div className='py-8 px-4'>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <h2 className="text-sm md:text-lg">{profile.heading}</h2>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mt-4">About</h3>
            <p className='text-sm'>{profile.about}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mt-4">Experience</h3>
            <ul>
              {profile.experience.map((exp, index) => (
                <li key={index} className="mt-2 border-b border-gray-800 py-2">
                  <h4 className="font-semibold">{exp.title} at {exp.company}</h4>
                  <p className='text-sm text-gray-600'>{exp.dates}</p>
                  <p className='text-sm'>{exp.description}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mt-4">Education</h3>
            <ul>
              {profile.education.map((edu, index) => (
                <li key={index} className="mt-2">
                  <h4 className="font-semibold">{edu.university} </h4>
                  <h5 className='font-light'>{edu.course}</h5>
                  <p className='text-sm text-gray-600'>{edu.dates}</p>
                  <p className='text-sm'>{edu.description}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold mt-4">Certification</h3>
            <ul>
              {profile.certification.map((cert, index) => (
                <li key={index} className="mt-2">
                  <h4 className="font-semibold">{cert.title} </h4>
                  <h5>{cert.organization}</h5>
                  <p className='text-sm text-gray-600'>{cert.dates}</p>
                  <p className='text-sm'>{cert.description}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold mt-4">Skills</h3>
            <ul className="list-disc list-inside">
              {profile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mt-4">Languages</h3>
            <ul className="list-disc list-inside">
              {profile.languages.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
