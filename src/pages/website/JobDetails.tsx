import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  List,
  Button,
  Divider,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Tooltip,
  DatePicker,
  Select,
  Alert,
} from "antd";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaRobot,
} from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import AppSpinner from "../../components/ui/Spinner";
import moment from "moment";
import { SparklesIcon } from "@heroicons/react/24/outline";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const job = {
  title: "Senior Software Engineer",
  company: "TaviaTech",
  location: "Motor-Ways Center, Lagos.",
  type: "Full-time",
  posted: "2 days ago",
  salary: "₦320k - ₦550k",
  description: `
   We are looking for a highly skilled and motivated Senior Software Engineer to join our dynamic development team. As a Senior Engineer, you will play a pivotal role in designing, building, and maintaining software solutions that are efficient, scalable, and secure. You will be responsible for leading development teams, mentoring junior engineers, and ensuring that the code we deliver is of the highest quality.  `,
  benefits: [
    "Health, Dental, and Vision Insurance",
    "401(k) with company match",
    "Unlimited PTO",
    "Flexible work hours",
    "Remote work options",
    "Learning and development budget",
  ],
  responsibilities: [
    "Develop and maintain web applications using modern frameworks.",
    "Collaborate with cross-functional teams to deliver high-quality software.",
    "Mentor junior developers and provide technical leadership.",
    "Participate in code reviews and ensure best practices are followed.",
  ],
  qualifications: [
    "5+ years of software development experience.",
    "Proficiency in JavaScript, TypeScript, and React.",
    "Experience with cloud platforms like AWS or Azure.",
    "Excellent problem-solving skills and attention to detail.",
  ],
};

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isParsingCv, setIsParsingCv] = useState(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);

  // Handle the modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle file upload and prefill fields
  const handleResumeUpload = async (file: any) => {
    setIsParsingCv(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send the resume to the backend
      const response = await axios.post(
        "https://odoobros.pythonanywhere.com/api/extract-info/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { name, email, phone, address } = response.data;

      // Prefill the form fields
      form.setFieldsValue({
        name,
        email,
        phone,
        address,
      });

      setIsParsingCv(false);
      message.success("Resume uploaded and form prefills loaded successfully!");
    } catch (error) {
      setIsParsingCv(false);
      message.error("Failed to upload resume and load form data.");
    }

    return false; // Prevent automatic upload by Ant Design Upload component
  };

  // Handle AI-based cover letter generation
  const generateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    try {
      const response = await axios.get(
        "https://api.example.com/generate-cover-letter"
      ); // Replace with your API endpoint for AI cover letter generation

      const { coverLetter } = response.data;

      // Prefill the cover letter field
      form.setFieldsValue({
        coverLetter,
      });

      setIsGeneratingCoverLetter(false);
      message.success("AI-generated cover letter loaded successfully!");
    } catch (error) {
      setIsGeneratingCoverLetter(false);
      message.error("Failed to generate cover letter.");
    }
  };

  const handleSubmit = (values: any) => {
    console.log("Application Submitted: ", values);
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="center">
        {/* Job Title and Company */}
        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(54, 162, 235, 0.2)" }}
          >
            <div className="flex justify-between items-center">
              <Title level={2} style={{ color: "#36A2EB" }}>
                {job.title}
              </Title>
              {/* Back to Listings Link */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/"
                  className="rounded-md px-3.5 py-[6px] text-sm font-semibold text-primary-1 hover:bg-primary-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-1"
                >
                  <span aria-hidden="true">&larr; &nbsp;</span> Back to Listings
                </Link>
              </div>
            </div>
            <Text strong>{job.company}</Text> - <Text>{job.location}</Text>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col>
                <Tag color="blue" icon={<FaBriefcase />} className="mb-2">
                  {job.type}
                </Tag>
              </Col>
              <Col>
                <Tag color="green" icon={<FaClock />} className="mb-2">
                  Posted {job.posted}
                </Tag>
              </Col>
              <Col>
                <Tag color="volcano" icon={<FaMapMarkerAlt />} className="mb-2">
                  {job.location}
                </Tag>
              </Col>
              <Col>
                <Tag color="gold" className="mb-2">
                  {job.salary}
                </Tag>
              </Col>
            </Row>
            {/* Job Description */}
            <Divider />
            <Paragraph>{job.description}</Paragraph>
            <Button
              type="primary"
              block
              style={{ backgroundColor: "#36A2EB", borderColor: "#36A2EB" }}
              onClick={showModal}
            >
              Apply Now
            </Button>
          </Card>
        </Col>

        {/* Job Details Sidebar */}
        <Col xs={24} md={8}>
          {/* Benefits Section */}
          <Card
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(54, 162, 235, 0.1)" }}
          >
            <Title level={4}>Benefits</Title>
            <List
              dataSource={job.benefits}
              renderItem={(item) => (
                <List.Item>
                  <FaCheckCircle
                    style={{ color: "#36A2EB", marginRight: "8px" }}
                  />
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Responsibilities and Qualifications */}
        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(54, 162, 235, 0.1)" }}
          >
            <Title level={4}>Responsibilities</Title>
            <List
              dataSource={job.responsibilities}
              renderItem={(item) => (
                <List.Item>
                  <Text>- {item}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(54, 162, 235, 0.1)" }}
          >
            <Title level={4}>Qualifications</Title>
            <List
              dataSource={job.qualifications}
              renderItem={(item) => (
                <List.Item>
                  <Text>- {item}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal for Job Application Form */}
      <Modal
        title="Job Application"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {isParsingCv && <AppSpinner color="#36A2EB" />}
          {/* Upload Resume with Tooltip */}
          <Form.Item label="Upload Resume" name="resume">
            <Tooltip title="Upload a resume to pre-fill the form fields.">
              <Upload
                beforeUpload={handleResumeUpload}
                maxCount={1}
                accept=".pdf,.doc,.docx"
                style={{
                  borderColor: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
                className="custom-input text-primary-1"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Tooltip>
          </Form.Item>

          {/* Alert for the upload section */}
          <Alert
            message="Upload a resume to pre-fill the form fields."
            type="info"
            style={{
              marginBottom: "16px",
              backgroundColor: "#F0F8FF",
              color: "#36A2EB",
            }}
          />

          {/* Prefilled Fields */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              placeholder="Enter your full name"
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
              }}
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
              }}
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              placeholder="Enter your phone number"
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
              }}
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              placeholder="Enter your address"
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
              }}
              className="custom-input"
            />
          </Form.Item>

          {/* Date of Birth Field */}
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: "Please input your date of birth!" },
            ]}
          >
            <DatePicker
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
                width: "100%",
              }}
              className="custom-input"
              format="DD/MM/YYYY"
              placeholder="Select your date of birth"
              disabledDate={(current) =>
                current && current > moment().endOf("day")
              }
            />
          </Form.Item>

          {/* Highest Qualification Field */}
          <Form.Item
            label="Highest Qualification"
            name="highestQualification"
            rules={[
              {
                required: true,
                message: "Please select your highest qualification!",
              },
            ]}
          >
            <Select
              placeholder="Select your highest qualification"
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
              }}
              className="custom-input"
            >
              <Option value="bachelors">Bachelors</Option>
              <Option value="masters">Masters</Option>
              <Option value="phd">PhD</Option>
            </Select>
          </Form.Item>

          {/* Additional Fields */}
          <Form.Item
            label="Years of Experience"
            name="yearsOfExperience"
            rules={[
              {
                required: true,
                message: "Please input your years of experience!",
              },
            ]}
          >
            <Input
              placeholder="Enter your years of experience"
              style={{
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
              }}
              className="custom-input"
            />
          </Form.Item>

          {/* Cover Letter Field with AI Suggestion */}
          <Row gutter={8}>
            <Col span={22}>
              <Form.Item label="Cover Letter" name="coverLetter">
                <Input.TextArea
                  rows={5}
                  placeholder="Write a cover letter"
                  style={{
                    borderColor: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={1}>
              <Tooltip title="Generate cover letter using AI">
                <Button
                  icon={
                    <SparklesIcon className="w-[18px] h-[18px] text-primary-1" />
                  }
                  loading={isGeneratingCoverLetter}
                  onClick={generateCoverLetter}
                  type="text" // Removes default border and background
                  style={{
                    height: "100%",
                    border: "none", // Remove any border
                    boxShadow: "none", // Remove any shadow or outline
                    backgroundColor: "transparent", // Ensure background stays transparent
                  }}
                  // Remove hover effects
                  className="no-hover custom-input"
                />
              </Tooltip>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "#36A2EB", borderColor: "#36A2EB" }}
          >
            Submit Application
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default JobDetails;
