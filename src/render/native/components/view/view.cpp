
#include "View.hpp"

#include <QEvent>
#include <QDebug>

void SWidget::insertChildBefore(void *child, void* beforeChildNode, void* childNode) {
    if (this->layout != nullptr) {
        this->layout->insertChildBefore(static_cast<QWidget*>(child), static_cast<YGNodeRef>(beforeChildNode), static_cast<YGNodeRef>(childNode));
    }
};

void SWidget::removeChild(void* child, void* flexNode) {
    if (this->layout != nullptr) {
        this->layout->removeWidget(static_cast<QWidget*>(child), static_cast<YGNodeRef>(flexNode));
    }
};

void SWidget::appendChild (void* child, void* flexNode) {
    // if (this->layout == nullptr) {
    //     this->layout = new FlexLayout();
    //     this->setLayout(this->layout);
    //     this->layout->setFlexNode(this->getFlexNode());
    // }
    if (this->layout != nullptr) {
        this->layout->addWidget(static_cast<QWidget*>(child), static_cast<YGNodeRef>(flexNode));
    }
};

SWidget::SWidget(QWidget *parentWidget): QWidget(parentWidget) {
    flexutils::configureFlexNode(this, this->getFlexNode(), false);
    if (this->layout == nullptr) {
        this->layout = new FlexLayout();
        this->setLayout(this->layout);
        this->layout->setFlexNode(this->getFlexNode());
    }
};

SWidget::~SWidget () {
    // delete this->layout;
}

void SWidget::setFlexNodeSizeControlled(bool isSizeControlled) {
    YGNodeRef node = this->getFlexNode();
    FlexNodeContext* ctx = flexutils::getFlexNodeContext(node);
    ctx->isSizeControlled = isSizeControlled;
};

static std::map<QEvent::Type, std::string> supportEvents {
  { QEvent::MouseButtonPress, "click" },
  { QEvent::MouseMove, "mouseMove" }
};

bool SWidget::event(QEvent *e) {
    std::map<QEvent::Type, std::string>::iterator iter;

    if ((iter = supportEvents.find(e->type())) != supportEvents.end()) {
        if (this->EventWidget::isEventRegist(iter->second)) {
            if (this->EventWidget::event(e, this->objectName(), iter->second, (QObject*)this)) {
                return true;
            }
        }
    }

    return this->QWidget::event(e);
}