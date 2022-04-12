import styles from './ProcessSteps.module.css';
import { step1, step2, step3, step4, step5 } from '../Logos';

const SourceBaeProcessSteps = () => {
    return (
        <section className={styles.steps_section}>
            <div className={styles.steps_title}>
                <span className={styles.title}>
                    Using SourceBae For Your Remote Hiring Is
                </span>
                <span className={styles.adjective_easy}>Easy</span>
            </div>
            <div className={styles.steps_frame}>
                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step1} alt="step1" />
                            <span className={styles.step_number}>
                                First Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Select Hire Type
                            </span>
                            <span className={styles.step_description}>
                                Choose Your Hire Type From Our Handpicked
                                Verified Agency
                            </span>
                            <div className={styles.step_options}>
                                <ul>
                                    <li>Hire Agency</li>
                                    <li>Hire Developer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step2} alt="step2" />
                            <span className={styles.step_number}>
                                Second Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Choose Your Preferences
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Agency{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Select Technology Or Budget
                                                Range To Find Agencies On Range
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Remote Developer{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Will Match Suitable Candidates.
                                                Or You Can Choose Manual.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step3} alt="step2" />
                            <span className={styles.step_number}>
                                Third Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Post Job
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Agency{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Select Service Type - Web,
                                                Mobile, Design, etc and Post.
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Remote Developer{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Best-Matched Engineers, Industry
                                                Experienced Developers.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step4} alt="step2" />
                            <span className={styles.step_number}>
                                Fourth Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Ask For Proposal
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Agency{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Connect Directly: Chat / Zoom /
                                                WhatsApp. SourceBae Helps You in
                                                Agreements Or Negotitations.
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Remote Developer{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Customer Success Team Will
                                                Contact You For Further
                                                Processes Like Agreements,
                                                Payment Terms, Candidate
                                                interviews.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step5} alt="step2" />
                            <span className={styles.step_number}>
                                Fifth Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Amazing Support!
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Available 24/7{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                WhatsApp, Email, Call
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SourceBaeProcessSteps;
