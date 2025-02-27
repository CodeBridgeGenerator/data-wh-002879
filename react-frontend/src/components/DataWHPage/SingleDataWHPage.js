import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import { Calendar } from 'primereact/calendar';

const SingleDataWHPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("dataWH")
            .get(urlParams.singleDataWHId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "DataWH", type: "error", message: error.message || "Failed get dataWH" });
            });
    }, [props,urlParams.singleDataWHId]);


    const goBack = () => {
        navigate("/dataWH");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">DataWH</h3>
                </div>
                <p>dataWH/{urlParams.singleDataWHId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ServiceName</label><p className="m-0 ml-3" >{_entity?.serviceName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Count</label><p className="m-0 ml-3" >{Number(_entity?.count)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Data</label><p className="m-0 ml-3" >{_entity?.data}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Timestamp</label><p className="m-0 ml-3" ><Calendar id="timestamp" value={new Date(_entity?.timestamp)} disabled={true} hourFormat="12"   /></p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleDataWHPage);
