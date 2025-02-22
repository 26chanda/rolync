import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const PrivacyPolicy = () => {
  return (
    <Container fluid style={{ padding: '0', backgroundColor: "#F5F5F7", minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Row>
        <Header />
      </Row>
      <Col xs={12} style={{ padding: '20px' }}>
        <Row style={{ marginLeft: "-23px", backgroundColor: "#4a4e52", width: "102%", marginRight: "20px", marginTop: "20px", marginBottom: "35px", height: "181px" }}>
          <Col xs={12} style={{ padding: '20px', backgroundColor: "#4a4e52", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderBottom: "0px", height: "100%", width: "100%", marginLeft: "5px" }}>
            <h1 style={{ margin: "20px", textAlign: 'center', color: "white", fontWeight: "bold", marginTop: "61px", fontSize: "46px", marginBottom: "-10px" }}>
              Privacy Policy
            </h1>
          </Col>
        </Row>

        {/* Privacy Policy Content */}
        <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ backgroundColor: "white", padding: '30px', borderRadius: '10px', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: '70%' }}>
          <p style={{ fontSize: "21px", textAlign: "left" }}>
            We're thrilled to have you here. These Privacy Policies are designed to ensure a positive and secure experience on Rolync. By accessing or using our website, you agree to these Terms. If you don't agree, please feel free to explore elsewhere.
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>Introduction</h3>
          <p style={{ fontSize: "21px" }}>
            Rolync ("Company" or "we") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide to the Company's mobile application, tablet application, technology platform, and website including any content, functionality, and services offered on or through such application, website, or platform (collectively, "Rolync") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          <p style={{ fontSize: "21px" }}>
            This policy applies to information we collect:
            <ul>
              <li>On Rolync;</li>
              <li>In email, text, and other electronic messages between you and Rolync.</li>
            </ul>
            It does not apply to information collected by:
            <ul>
              <li>Us offline or through any other means, including on any other website, application, platform, etc. operated by Company or any third party; or</li>
              <li>Any third party, including through any application or content (including advertising) that may link to or be accessible from or on Rolync.</li>
            </ul>
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>Information Covered by this Privacy Policy</h3>
          <p style={{ fontSize: "21px" }}>
            This Privacy Policy only applies to personal information (as defined below). This policy excludes the following categories of information:
            <ul>
              <li>Publicly available information from government records.</li>
              <li>Deidentified or aggregate consumer information.</li>
            </ul>
          </p>

          {/* Example Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identifiers</td>
                <td>A real name, unique personal identifier, online identifier, email address, postal address, account name</td>
              </tr>
              <tr>
                <td>Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</td>
                <td>A name, telephone or mobile number, address, credit card number, debit card number, or any other financial information; education, employment, employment history</td>
              </tr>
              <tr>
                <td>Protected classification characteristics under California or federal law</td>
                <td>Age and date of birth, sex</td>
              </tr>
              <tr>
                <td>Geolocation data</td>
                <td>Physical location</td>
              </tr>
              <tr>
                <td>Biometric information</td>
                <td>Physiological, behavioral, and biological characteristics, or activity patterns used to extract a template, physical image</td>
              </tr>
              <tr>
                <td>Internet or other similar network activity</td>
                <td>Browsing history, search history, information on a consumer's interaction with a website, application, or advertisement</td>
              </tr>
              <tr>
                <td>Professional or employment-related information</td>
                <td>Current or past job history or performance evaluations</td>
              </tr>
              <tr>
                <td>Non-public education information</td>
                <td>Education records directly related to a student maintained by an educational institution or party acting on its behalf</td>
              </tr>
              <tr>
                <td>Inferences drawn from other personal information</td>
                <td>Profile reflecting a person's preferences, characteristics, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes</td>
              </tr>
            </tbody>
          </Table>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>How We Use Your Personal Information</h3>
          <p style={{ fontSize: "21px" }}>
            We may use, or disclose the personal information we collect for one or more of the following purposes:
            <ul>
              <li>To create user profile and user analytics so we can make our recommendations for courses and learning institutions.</li>
              <li>To fulfill or meet the reason you provided the information. For example, if you share your name and contact information to ask a question about Rolync, we will use that personal information to respond to your inquiry.</li>
              <li>To provide, support, personalize, and develop Rolync.</li>
              <li>To process your requests, purchases, transactions, and payments and prevent transactional fraud.</li>
              <li>To create, maintain, customize, and secure your account with us.</li>
              <li>To provide you with support and to respond to your inquiries, including to investigate and address your concerns and monitor and improve our responses.</li>
              <li>To personalize the Rolync experience and to deliver content and product and service offerings relevant to your interests.</li>
              <li>To help maintain the safety, security, and integrity of Rolync.</li>
              <li>For testing, research, analysis, and product development.</li>
              <li>To respond to law enforcement requests as required by law, court order, or government regulations.</li>
            </ul>
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>Disclosure Sharing, and the (Non)Sale of Your Personal Information</h3>
          <p style={{ fontSize: "21px" }}>
            We may share your personal information by disclosing it to a third party for a business purpose:
            <ul>
              <li>To contractors, service providers, and other third parties we use to support our business.</li>
              <li>To fulfill the purpose for which you provide it. For example, if you consent to the sharing of your profile and/or analytics to a learning institution.</li>
              <li>For any other purpose disclosed by us when you provide the information.</li>
              <li>With your consent, e.g., we will share your personal information with third parties to send you promotional emails.</li>
              <li>To comply with any court order, law, or legal process.</li>
            </ul>
            We do not sell personal information.
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>FOR CALIFORNIA CITIZENS – Your Rights and Choices</h3>
          <p style={{ fontSize: "21px" }}>
            The California Consumer Privacy Act of 2018 (“CCPA”) provides California residents with specific rights regarding their personal information.
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>CA's Right to Know and Data Portability</h3>
          <p style={{ fontSize: "21px" }}>
            You have the right to request that we disclose certain information to you about our collection and use of your personal information over the past 12 months (the "right to know"). Once we receive your request and confirm your identity, we will disclose to you:
            <ul>
              <li>The categories of personal information we collected about you.</li>
              <li>The categories of sources for the personal information we collected about you.</li>
              <li>Our business or commercial purpose for collecting or selling that personal information.</li>
              <li>The specific pieces of personal information we collected about you.</li>
            </ul>
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>Exercising Your CA Rights to Know or Delete</h3>
          <p style={{ fontSize: "21px" }}>
            To exercise your rights to know or delete described above, please submit a request by either:
            <ul>
              <li>Calling us at [TOLL-FREE NUMBER].</li>
              <li>Emailing us at info.rolync@gmail.com.</li>
            </ul>
            Only you, or someone legally authorized to act on your behalf, may make a request to know or delete related to your personal information.
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>No Discrimination for Exercising CA Rights</h3>
          <p style={{ fontSize: "21px" }}>
            We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA, we will not:
            <ul>
              <li>Deny you goods or services.</li>
              <li>Charge you different prices or rates for goods or services.</li>
              <li>Provide you with a different level or quality of goods or services.</li>
            </ul>
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>Changes to Our Privacy Policy</h3>
          <p style={{ fontSize: "21px" }}>
            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you.
          </p>

          <h3 style={{ fontWeight: "700", fontSize: "37px", textAlign: "left", marginTop: "43px" }}>Contact Information</h3>
          <p style={{ fontSize: "21px" }}>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at: info.rolync@gmail.com.
          </p>
          </div>
        </Col>
      </Col>

      <Footer />
    </Container>
  );
};

export default PrivacyPolicy;
