import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const Breadcrumbs = () => {

    const navigate = useNavigate();

    const { projectId } = useParams();
    const location = useLocation();
    const pathParts = location.pathname.split('/').slice(5);

    return (
        <div className="breadcrumbs">
            {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                    <span
                        onClick={() => navigate(`/workspace/project/${projectId}/${pathParts.slice(0, index + 1).join('/')}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {part}
                    </span>
                    {index < pathParts.length - 1 && ' / '}
                </React.Fragment>
            ))}
        </div>
    );
};