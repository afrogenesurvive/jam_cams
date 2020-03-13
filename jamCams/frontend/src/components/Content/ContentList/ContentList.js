import React from 'react';

import ContentItem from './ContentItem/ContentItem';
import './ContentList.css';

const contentList = props => {

  const contents = props.contents.map(content => {
    return (
      <ContentItem
        key={content._id}
        content={content}
        authId={props.authId}
        _id={content._id}
        date={content.date}
        type={content.type}
        title={content.title}
        file={content.file}
        creator={content.creator}
        models={content.models}
        viewCount={content.viewCount}
        likeCount={content.likeCount}
        comments={content.comments}
        tags={content.tags}
        onDetail={props.onViewDetail}
        onSelectNoDetail={props.onSelectNoDetail}
      />
    );
  });

  return <ul className="user__list1_master">{contents}</ul>;
};

export default contentList;
